var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    var kittySchema = new mongoose.Schema({
        name: String
    });
    var Kitten = mongoose.model('Kitten', kittySchema);

    var silence = new Kitten({ name: 'Silencer' });
    console.log(silence.name);

    kittySchema.methods.speak = function () {
        var greeting = this.name
            ? "Meow name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    }
    // silence.speak();

    var Kitten = mongoose.model('Kitten', kittySchema);

    var fluffy = new Kitten({ name: 'fluffy' });
    // fluffy.speak();

    fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
    });
});

