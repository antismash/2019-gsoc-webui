# AntiSmash Redesign

## Running Project Locally:

### Running Dummy server
* create a file called server.json with following content-
```
    {
        "stats": {
            "fast": 0,
            "legacy": 31,
            "queue_length": 0,
            "running": 1,
            "status": "working",
            "total_jobs": 509017,
            "ts_fast": null,
            "ts_fast_m": null,
            "ts_legacy": "2019-04-01 23:24",
            "ts_legacy_m": "2019-04-01T23:24:37Z",
            "ts_queued": null,
            "ts_queued_m": null
        }
    }
```
* install json-server globally

    ``` npm install -g json-server```

* Run dummy server

    ``` json-server server.json -p 3010 -d 2000```

    -d add delay time of 2000ms in sending the response. This is just for the purpose of simulating remote server like experience to the client.



* create .env file in project home directory and add following lines

    ```
    # .env
    
    API_BASE_URL=http://localhost:3010/
    ```

### Start client using webpack
    
   * ``` git clone https://github.com/antismash/2019-gsoc-webui.git ```
   * ``` npm install ```
   * ``` npm start ```


### Useful Links
* A demo project on lit-html : https://github.com/Polymer/lit-html/blob/master/demo/clock

* YouTube links:

    https://www.youtube.com/watch?v=Io6JjgckHbg

    https://www.youtube.com/watch?v=ypPRdtjGooc

* HTMLElement Interface: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
