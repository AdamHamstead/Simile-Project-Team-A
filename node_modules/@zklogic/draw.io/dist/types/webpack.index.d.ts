/**
 * @param { mimeType:string } mimeType
 * @param { base64Encoded:string } base64Encoded
 */
export function getImageSrc(mimeType: any, base64Encoded: any): string;
/**
 * Enum for Action-Type values.
 */
export type ActionType = string;
export namespace ActionType {
    const DEFAULT: string;
    const CUSTOM: string;
    const IMPORT: string;
    const EXPORT: string;
    const EXPORTSVG: string;
    const NEW: string;
    const OPEN: string;
}
/**
 * @typedef {{ width: number, height: number }} GraphSize
 * @typedef {{ fillColor?: string, strokeColor?: string, fontColor?: string }} SvgStyle
 * @typedef {{ actionType:ActionType, callback: OptOut | OptIn, callbackOnFinish?:OptOut, callbackOnError?:OptOut|any }} MenuActionType
 * @typedef {{ actionType:ActionType, callback: OptOut | OptIn, callbackOnFinish?:OptOut, callbackOnError?:OptOut|any,
 *              title?: string, style?:CSSStyleDeclaration, className?:string }} ButtonActionType
 * @typedef {{ orgChartDev?: boolean, navitgateToUrl?:string, svgStyle?: SvgStyle,
 *      actions?: {menu?:{help?:boolean} subMenu? : {save?: OptOut, saveAs?: OptOut, open?: OptIn}},
 *      actionsButtons?: {[key:string]: ButtonActionType},
 *      extraActions?: {[key:string]:
 *          { [key:string]:MenuActionType | {[key:string]: MenuActionType }}
 *      }, loadAsync?: boolean
 * }} GraphInitConfig
 * @typedef {{ xml: string, name: string }} GraphXmlData
 * @typedef {{ status: string, reason?: any}} GraphEditorNew
 * @typedef {{ status: string, graphData: GraphXmlData, reason?: any}} GraphEditorOut
 * @typedef {{ status: string, graphData?: GraphXmlData, reason?: any}} GraphEditorIn
 * @typedef {{ status: string, graphData: GraphXmlData, document?: DOMParser|XMLDocument , reason?: any }} GraphEditorData
 * @typedef {{ status: string, graphEditorObj?: any, message?: string , reason?: any }} GraphEditorLoaded
 * @typedef {{ base64Encoded: string, mimeType: string, getImageSrc?: getImageSrc }} GraphEditorImage
 * @typedef {{ status: string svg:string, xml?: string, name?: string, image: GraphEditorImage, reason?: any }} GraphEditorSVG
 */
export class GraphEditor {
    /** @private */
    private printSetupActions;
    /** @private */
    private hideMenus;
    /** @private */
    private editorUiObj;
    /**
     * @private
     * @param {number} scriptGroup
     * @param {number} scriptIndex
     * @param {HTMLDivElement | HTMLElement} scriptContainer - Grapheditor scripts container.
     */
    private loadScript;
    /** @private */
    private backupWindowObject;
    /** @private */
    private pouplateScriptVars;
    /** @private */
    private addWebScript;
    /** @private */
    private isLoadAsync;
    /**
     * @private
     * @param {number} scriptIndex
     * @param {HTMLDivElement | HTMLElement} scriptContainer - Grapheditor scripts container.
     * @param {GraphInitConfig} [config] - Grapheditor Configuration.
     */
    private appendScriptAtIndex;
    /**
     * @private
     * @param {HTMLDivElement | HTMLElement} scriptContainer - Grapheditor scripts container.
     * @param {GraphInitConfig} [config] - Grapheditor Configuration.
     */
    private init;
    /**
     * @private
     * @param {GraphInitConfig} [config] - Grapheditor Configuration.
     */
    private preScript;
    activateSideBar(editorUi: any): void;
    /**
     * @private
     * @param {GraphInitConfig} [config] - Grapheditor Configuration.
     */
    private postScript;
    /**
     * @param {GraphXmlData} graphData - Grapheditor xml.
     * @returns {Promise<GraphEditorData>} Promise<GraphEditorData>
     */
    setGrapheditorData(graphData: GraphXmlData): Promise<GraphEditorData>;
    /**
     * @private
     * @returns {{menu: menuList,subMenu: subMenuList}} Menu & SubMenu List
     */
    private getMenuList;
    /**
     * @param {HTMLDivElement | HTMLElement} container - Grapheditor container.
     * @param {HTMLDivElement | HTMLElement} scriptContainer - Grapheditor scripts container.
     * @param {GraphInitConfig} [config] - Grapheditor Configuration.
     * @returns {Promise<GraphEditorLoaded>} Promise<GraphEditorLoaded>
     */
    initialized(container: HTMLDivElement | HTMLElement, scriptContainer: HTMLDivElement | HTMLElement, config?: GraphInitConfig): Promise<GraphEditorLoaded>;
    destroyGrapheditor(): void;
}
export type OptOut = (graphData: GraphXmlData | GraphEditorSVG) => Promise<GraphEditorOut | GraphEditorSVG>;
export type OptIn = () => Promise<GraphEditorIn>;
export type OptNew = () => Promise<GraphEditorNew>;
export type GraphSize = {
    width: number;
    height: number;
};
export type SvgStyle = {
    fillColor?: string;
    strokeColor?: string;
    fontColor?: string;
};
export type MenuActionType = {
    actionType: ActionType;
    callback: OptOut | OptIn;
    callbackOnFinish?: OptOut;
    callbackOnError?: OptOut | any;
};
export type ButtonActionType = {
    actionType: ActionType;
    callback: OptOut | OptIn;
    callbackOnFinish?: OptOut;
    callbackOnError?: OptOut | any;
    title?: string;
    style?: CSSStyleDeclaration;
    className?: string;
};
export type GraphInitConfig = {
    orgChartDev?: boolean;
    navitgateToUrl?: string;
    svgStyle?: SvgStyle;
    actions?: {
        menu?: {
            help?: boolean;
        };
        subMenu?: {
            save?: OptOut;
            saveAs?: OptOut;
            open?: OptIn;
        };
    };
    actionsButtons?: {
        [key: string]: ButtonActionType;
    };
    extraActions?: {
        [key: string]: {
            [key: string]: MenuActionType | {
                [key: string]: MenuActionType;
            };
        };
    };
    loadAsync?: boolean;
};
export type GraphXmlData = {
    xml: string;
    name: string;
};
export type GraphEditorNew = {
    status: string;
    reason?: any;
};
export type GraphEditorOut = {
    status: string;
    graphData: GraphXmlData;
    reason?: any;
};
export type GraphEditorIn = {
    status: string;
    graphData?: GraphXmlData;
    reason?: any;
};
export type GraphEditorData = {
    status: string;
    graphData: GraphXmlData;
    document?: DOMParser | XMLDocument;
    reason?: any;
};
export type GraphEditorLoaded = {
    status: string;
    graphEditorObj?: any;
    message?: string;
    reason?: any;
};
export type GraphEditorImage = {
    base64Encoded: string;
    mimeType: string;
    getImageSrc?: typeof getImageSrc;
};
export type GraphEditorSVG = {
    status: string;
    svg: string;
    xml?: string;
    name?: string;
    image: GraphEditorImage;
    reason?: any;
};
