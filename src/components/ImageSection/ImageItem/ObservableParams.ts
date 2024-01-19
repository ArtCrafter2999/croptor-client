import {Position} from "../../../reducer/reducer";
import {Horizontal, Vertical} from "../../../models/Alignment";
import {GlobalParams, ImageParams, Parameters} from "../../../models/Params";

class ObservableParams implements Parameters {
    private _centerPosition: Position | null;
    private _fitNCrop: boolean;
    private _horizontalSnap: Horizontal;
    private _useDefault: boolean;
    private _verticalSnap: Vertical;

    constructor(private params: Parameters, private onChange: (p: Parameters) => void) {
        this._centerPosition = "centerPosition" in params? params.centerPosition : null;
        this._fitNCrop = params.fitNCrop;
        this._horizontalSnap = params.horizontalSnap
        this._useDefault = params.useDefault;
        this._verticalSnap = params.verticalSnap;
    }

    get centerPosition(): Position | null {
        return this._centerPosition;
    }

    set centerPosition(value: Position | null) {
        this._centerPosition = value;
        this.update(true);
    }

    get fitNCrop(): boolean {
        return this._fitNCrop;
    }

    set fitNCrop(value: boolean) {
        this._fitNCrop = value;
        this.update(true);
    }

    get horizontalSnap(): Horizontal {
        return this._horizontalSnap;
    }

    set horizontalSnap(value: Horizontal) {
        this._horizontalSnap = value;
        this.update(true);
    }
    get useDefault(): boolean {
        return this._useDefault;
    }

    set useDefault(value: boolean) {
        console.log(value)
        this._useDefault = value;
        this.update();
    }

    get verticalSnap(): Vertical {
        return this._verticalSnap;
    }

    set verticalSnap(value: Vertical) {
        this._verticalSnap = value;
        this.update(true);
    }

    private update(changed: boolean = false): void {
        this.onChange({
            useDefault: this.useDefault,
            centerPosition: this.centerPosition,
            fitNCrop: this.fitNCrop,
            horizontalSnap: this.horizontalSnap,
            verticalSnap: this.verticalSnap,
            changed
        } as Parameters)
    }
}
export default ObservableParams;