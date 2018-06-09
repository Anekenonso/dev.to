import Pusher from 'pusher-js';

export default function setupPusher(key, callbackObjects) {
  const pusher = new Pusher(key, {
    authEndpoint: '/pusher/auth',
    auth: {
      headers: {
        'X-CSRF-Token': window.csrfToken
      }
    },
    cluster: 'us2',
    encrypted: true,
  });
  const channel = pusher.subscribe(callbackObjects.channelId.toString());
  channel.bind('message-created', callbackObjects.messageCreated);
  channel.bind('channel-cleared', callbackObjects.channelCleared);
  channel.bind('user-banned', callbackObjects.redactUserMessages);
}