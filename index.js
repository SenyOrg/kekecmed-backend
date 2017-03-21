/**
 * KekecMed Backend
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @version 0.1
 */

// Create Application
var app = require('./build/app').default;

// Start server on port 3010
app.listen(3010);