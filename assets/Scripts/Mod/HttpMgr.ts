export default class HttpMgr {
    private static _instance: HttpMgr
    public static get instance(): HttpMgr {
        if (!this._instance) {
            this._instance = new HttpMgr()
        }
        return this._instance
    }

    httpGet(url, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                var respone = JSON.parse(xhr.responseText);
                callback(respone);
            }
        };
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.timeout = 5000;// 5 seconds for timeout
        xhr.send();
    }

    httpPost(url, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            //cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                var respone = JSON.parse(xhr.responseText);
                callback(respone);
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.timeout = 5000;// 5 seconds for timeout
        xhr.send(params);

    }
}

