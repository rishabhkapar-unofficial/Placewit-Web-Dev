function create(_id, _text, _done) {

    // Private Data Members
    let id = _id, text = _text, done = _done;

    // Getter Functions
    this.getText = function() { return text; }
    this.isDone = function() { return done; }
    this.getID = function() { return id; }

    // Setter Functions
    this.setText = function(_text) {
        _text = _text.trim();
        if(_text)
            text = _text;
    }

    this.markDone = function() { done = true; }
    this.markToDo = function() { done = false; }
}

module.exports = { create };
