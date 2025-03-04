'use strict';

const crypto = require('crypto');

function hashsaltgen(password, salt = null, iterations = 10000)
{
  if (!password || typeof password !== 'string')
    throw new Error('no password provided');
  
  if (!salt)
    salt = crypto.randomBytes(12);
	else if (typeof salt === 'string')
  	salt = Buffer.from(salt, 'hex');
	else if (!Buffer.isBuffer(salt))
    throw new Error('wrong salt type');

	const hash = crypto.pbkdf2Sync(password, salt, iterations, 12, 'sha1');
	return 'pbkdf2' + '$' + iterations + '$' + hash.toString('hex') + '$' + salt.toString('hex');
}

function hashsaltcheck(challengepassword, hashedpassword)
{
	if (!challengepassword || typeof challengepassword !== 'string')
    throw new Error('no challenge password provided');

  if (!hashedpassword)
    throw new Error('no hashed password provided');

  const key = hashedpassword.split('$');

	if (key.length !== 4)
    throw new Error('malformed hashed password');

  const cryptofct = key[0];
	if (cryptofct !== 'pbkdf2')
    throw new Error('wrong algorithm');

  const iterations = parseInt(key[1]);
	if (Number.isNaN(iterations))
    throw new Error('wrong iteration number format');

  const realkey = key[2];
  const salt = Buffer.from(key[3], 'hex');

	const challengehash = hashsaltgen(challengepassword, salt, iterations);

  const challengekey = challengehash.split('$')[2];

	if (challengekey === realkey)
    return true;
  return false;    
}

module.exports = { hashsaltgen, hashsaltcheck };
