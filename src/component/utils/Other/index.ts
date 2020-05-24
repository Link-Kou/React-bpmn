export default class Other {

    private static _fullScreen: boolean = false

    public static FullScreen() {
        if (this._fullScreen) {
            this._fullScreen = false
            const de: any = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        } else {
            this._fullScreen = true
            const de: any = document.documentElement;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        }
    }

}
