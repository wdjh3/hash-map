class HashMap {
  #capacity = 16;
  #loadFactor = 0.75;
  constructor() {
    this.map = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashedIndex = this.hash(key);
    const bucket = this.map[hashedIndex];
    if (!bucket) {
      this.map[hashedIndex] = new Node(key, value);
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
}

class Node {
  constructor(key, value, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

export { HashMap };
