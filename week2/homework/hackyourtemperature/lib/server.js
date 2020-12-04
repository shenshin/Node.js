"use strict";
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('hello from backend to frontend!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`Server started on port ${PORT}`);
});
//# sourceMappingURL=server.js.map