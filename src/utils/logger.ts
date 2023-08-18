import { colors, customLog } from "./colors";

type LogFunc = (message: string, type: "info" | "warn" | "success" | "error") => void;
type EmptyFunc = () => void;

type LoggerFunc = {
    (): void;
    (message: string, type: "info" | "warn" | "success" | "error"): void;
    info: (LogFunc | EmptyFunc)
    warn: (LogFunc | EmptyFunc)
    success: (LogFunc | EmptyFunc)
    error: (LogFunc | EmptyFunc)
}

let obj = {
    info(message: string) {
        customLog([colors.bold, colors.white], "[ ");
        customLog([colors.bold, colors.blue], "INFO");
        customLog([colors.bold, colors.white], " ]: ");
        customLog([colors.bold, colors.white], message + "\n");
    },
    warn(message: string) {
        customLog([colors.bold, colors.white], "[ ");
        customLog([colors.bold, colors.yellow], "WARN");
        customLog([colors.bold, colors.white], " ]: ");
        customLog([colors.bold, colors.white], message + "\n");
    },
    success(message: string) {
        customLog([colors.bold, colors.white], "[ ");
        customLog([colors.bold, colors.green], "DONE");
        customLog([colors.bold, colors.white], " ]: ");
        customLog([colors.bold, colors.white], message + "\n");
    },
    error(message: string) {
        customLog([colors.bold, colors.white], "[ ");
        customLog([colors.bold, colors.red], "FAIL");
        customLog([colors.bold, colors.white], " ]: ");
        customLog([colors.bold, colors.white], message + "\n");
    }
}

export function BuchtaLogger(quiet: boolean) { 
    if (!quiet) {
        let l = <LoggerFunc>((message: string, type: "info" | "warn" | "success" | "error") => {
            obj[type](message);
        })

        l.info = obj["info"];
        l.warn = obj["warn"];
        l.success = obj["success"];
        l.error = obj["error"];

        return l;
    }
    let l = <LoggerFunc>(() => {})

    l.info = () => {}
    l.warn = () => {}
    l.success = () => {}
    l.error = () => {}

    return l;
}
