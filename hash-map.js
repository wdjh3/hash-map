class HashMap {
  #capacity = 16;
  #loadFactor = 0.75;
  #length = 0;
  constructor() {
    this.map = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.#capacity;
  }

  set(key, value) {
    const hashedIndex = this.hash(key);
    const bucket = this.map[hashedIndex];
    if (!bucket) {
      this.map[hashedIndex] = new Node(key, value);
      this.#length++;
      this.adjustSize();
      return;
    }
    let currentNode = bucket;
    if (currentNode.key === key) {
      currentNode.value = value;
      return;
    }
    while (currentNode.nextNode) {
      if (currentNode.nextNode.key === key) {
        currentNode.nextNode.value = value;
        return;
      }
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = new Node(key, value);
    this.#length++;
    this.adjustSize();
  }

  adjustSize() {
    if (this.#length > this.#capacity * this.#loadFactor) {
      this.#capacity *= 2;
      const entries = this.entries();
      this.clear();
      for (const entry of entries) {
        this.set(entry[0], entry[1]);
      }
    }
  }

  get(key) {
    const hashCode = this.hash(key);

    let currentNode = this.map[hashCode];
    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.nextNode;
    }
    return null;
  }

  has(key) {
    const hashCode = this.hash(key);

    let currentNode = this.map[hashCode];
    while (currentNode) {
      if (currentNode.key === key) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  remove(key) {
    const hashCode = this.hash(key);

    if (!this.map[hashCode]) {
      return false;
    }
    let currentNode = this.map[hashCode];
    if (currentNode.key === key) {
      this.map[hashCode] = currentNode.nextNode;
      this.#length--;
      return true;
    }
    while (currentNode.nextNode) {
      if (currentNode.nextNode.key === key) {
        currentNode.nextNode = currentNode.nextNode.nextNode;
        this.#length--;
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  length() {
    return this.#length;
  }

  clear() {
    this.#length = 0;
    this.map = [];
  }

  keys() {
    const keys = [];
    for (const bucket of this.map) {
      let currentNode = bucket;
      while (currentNode) {
        keys.push(currentNode.key);
        currentNode = currentNode.nextNode;
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (const bucket of this.map) {
      let currentNode = bucket;
      while (currentNode) {
        values.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (const bucket of this.map) {
      let currentNode = bucket;
      while (currentNode) {
        // Format: [ key , value ]
        entries.push([currentNode.key, currentNode.value]);
        currentNode = currentNode.nextNode;
      }
    }
    return entries;
  }
}

class Node {
  constructor(key, value, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

export { HashMap };
