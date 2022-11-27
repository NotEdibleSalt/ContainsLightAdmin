import { Websocket, WebsocketBuilder } from "websocket-ts";

export const ws: Websocket = new WebsocketBuilder("ws://121.40.165.18:8800")
  .onOpen(() => {
    console.log("Websocket opened");
  })
  .onClose(() => {
    console.log("Websocket closed");
  })
  .onError(() => {
    console.log("Websocket error");
  })
  .onMessage((instance, env) => {
    console.log("Websocket message: ", env.data);
  })
  .onRetry(() => {
    console.log("Websocket retry");
  })
  .build();
