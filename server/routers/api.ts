import { Router } from 'express';
import * as account from '../account';

export const router = Router();

// Routes
router.post('/login', account.login);
router.post('/createAccount', account.createAccount);
router.post('/usersList', account.usersList);
router.post('/dropCollection', account.dropCollection);
