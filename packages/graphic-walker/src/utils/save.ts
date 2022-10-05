import { IDataSet, IDataSource, IVisSpec } from "../interfaces";
import { VisSpecWithHistory } from "../models/visSpecHistory";


export function dumpsGWPureSpec (list: VisSpecWithHistory[]): IVisSpec[] {
    return list.map(l => l.exportGW())
}

export function parseGWPureSpec (list: IVisSpec[]): VisSpecWithHistory[] {
    return list.map(l => new VisSpecWithHistory(l))
}

interface IStoInfo {
    datasets: IDataSet[];
    specList: IVisSpec[];
    dataSources: IDataSource[]
}

export function stringifyGWContent (info: IStoInfo) {
    return JSON.stringify(info)
}

export function parseGWContent (raw: string): IStoInfo {
    return JSON.parse(raw)
}
// JSON.stringify

export function download(data: string, filename: string, type: string) {
    var file = new Blob([data], {type: type});
    // @ts-ignore
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        // @ts-ignore
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}