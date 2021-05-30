# mail-proton-api

Unofficial API for ProtonMail. Works both in browser and Node.js

# Usage example

```js
const protonmail = require('mail-proton-api');

(async () => {
    const client = new protonmail.ProtonmailClient();

    // login to the protonmail
    await client.login({
        username: process.env.PROTONMAIL_USERNAME,
        loginPassword: process.env.PROTONMAIL_PASSWORD,
    });

    // fetch private keys in order to decrypt messages
    await client.fetchKeys({
        password: process.env.PROTONMAIL_PASSWORD,
    });

    // fetch the first 10 messages
    const messagesResponse = await client.messages.list({
        LabelID: protonmail.DefaultLabels.All,
        Limit: 10,
        Page: 0,
    });
    
    // take the first one
    const firstMessage = messagesResponse.Messages[0];
    // get the full message with body
    const m = await client.messages.get(firstMessage.ID);

    // decrypt message
    const m_decrypted = await client.decryptMessage(m.Message);

    // here is your message body. you can do anything with it
    console.log(m_decrypted);

    // move the message to trash
    await client.messages.label([firstMessage.ID], protonmail.DefaultLabels.Trash);
    // delete the message
    await client.messages.delete([firstMessage.ID]);
})();
```
