const builder = require('content-security-policy-builder')

let config = {
  directives: {
    defaultSrc: [`'self'`, 'wss://gundb.alheimsins.net'],
    scriptSrc: [`'self'`, `'sha512-MDAzMERGQUMxNzMyRTU5RkUzMEEwMjZDOUYxQ0ZCRTVBNzMyRjgyQjZBQjk4NzRCQkEzRkE3QkJDOUMyNjk1NjZEQkRGRjQ3MjM2NEQ1RDNDMjhBMUY3NjZDNEIwNjJCOTI2N0YzMTI4OUIyNzNBREJBNEZDNEU1NzVEQTcyODk='`],
    formAction: [`'self'`]
  }
}

console.log(builder(config))
