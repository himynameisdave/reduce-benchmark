const fs = require('fs');
const resolve = require('path').resolve;
const users = JSON.parse(fs.readFileSync(resolve(process.cwd(), 'users.json'), 'utf8'));

const isInTwenties = user => user.age >= 20 && user.age < 30;
const makeFullName = user => `${user.firstName} ${user.lastName}`;
const isAtLeastTenChars = fullName => fullName.length >= 10;


console.time('singlePass');
const singlePass = users.reduce((accumulator, user) => {
    const fullName = makeFullName(user);
    if (isInTwenties(user) && isAtLeastTenChars(fullName)) accumulator.push(fullName);
    return accumulator
}, []);
console.timeEnd('singlePass');

console.time('threeIterations');
const threeIterations = users.filter(isInTwenties)
                             .map(makeFullName)
                             .filter(isAtLeastTenChars);
console.timeEnd('threeIterations');
