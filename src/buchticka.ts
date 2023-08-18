import { PluginManager } from "./plugin_manager";

export interface BuchtickaPlugin {
    name: string;
    dependsOn?: string[];
    conflictsWith?: string[];
    driver: (this: Buchticka) => void;
}

export class Buchticka {
    private pluginManager = new PluginManager(this);

    constructor() {
    }
}
