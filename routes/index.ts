import express = require('express');
const router = express.Router();

import * as constClass from "../modules/Contains";

var constains = new constClass.Constains();

router.get('/', (req: express.Request, res: express.Response) => {
    
    res.render('index', {
        title: constains.PROGRAM_TITLE,
        program_title_and_version: constains.PROGRAM_TITLE_AND_VERSION
    });    
});

export default router;