import { type BunPlugin } from "bun";
import { type BuchtickaPlugin, type Buchticka } from "./buchticka";

type BunPlugins = BunPlugin[];

export class PluginManager {
    // TODO: used for logging
    private instance: Buchticka;

    private serverPlugins: BunPlugins = [];
    private bundlerPlugins: BunPlugins = [];
    private knownPlugins: String[] = [];
    private currentPlugin = "???";

    constructor(build: Buchticka) {
        this.instance = build;
    }

    add(plug: BuchtickaPlugin) {
        if (this.knownPlugins.includes(plug.name)) {
            // FIX: log error
            return false;
        }

        let arr = plug.dependsOn ?? [];
        let length = arr.length;
        for (let i = 0; i < length; i++) {
            if (!this.knownPlugins.includes(arr[i])) {
                // FIX: log error
                return false;
            }
        }

        arr = plug.conflictsWith ?? [];
        length = arr.length;
        for (let i = 0; i < length; i++) {
            if (this.knownPlugins.includes(arr[i])) {
                // FIX: log error
                return false;                
            }
        }

        this.knownPlugins.push(plug.name);
        this.currentPlugin = plug.name;

        return true;
    }

    getCurrentPlugin() {
        return this.currentPlugin;
    }

    addBundlerPlugin(plug: BunPlugin) {
        this.bundlerPlugins.push(plug);
    }

    addServerPlugin(plug: BunPlugin) {
        this.serverPlugins.push(plug);
    }

    getBundlerPlugins() {
        return this.bundlerPlugins;
    }

    inject() {
        let arr = this.serverPlugins;
        let length = arr.length;
        for (let i = 0; i < length; i++) {
            Bun.plugin(arr[i]);
        }
    }
}
