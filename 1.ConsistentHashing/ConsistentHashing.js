module.exports = class ConsistentHashing {

    //intro: I want to distribute the keys across the servers so I can find them again    
    constructor() {
    }

    //returns the remainder of a division, after one number is divided
    //by another (i.e.: modulus of the operation)
    testModuloOperation() {
        let remainder = 10 % 1; //always zero
        console.log("Remainder is: " + remainder);

        remainder = 10 % 0; //undefined
        console.log("Remainder is: " + remainder);
    }

    //Solution 1: mod-N hashing
    testModNHashing() {
        var servers = ['emea', 'nam', 'apac']
        for (var i = 0; i < servers.length; i++) {
            console.log('Server at [' + i + ']:' + servers[i]);
        }

        var nodes = {};
        var chars = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];

        chars.forEach(function (c) {
            let requestHash = c;
            let modulo = requestHash.charCodeAt(0) % servers.length;
            var node = servers[modulo];
            if (nodes[node]) {
                nodes[node].push(c);
            } else {
                nodes[node] = [];
                nodes[node].push(c);
            }
        });

        console.log(nodes);
    }

    testConsistentHashing() {
        var chLib = require('consistent-hashing');
        var servers = new chLib(['emea', 'nam', 'apac']);

        var nodes = {};
        var chars = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];

        chars.forEach(function (c) {
            var node = servers.getNode(c);

            if (nodes[node]) {
                nodes[node].push(c);
            } else {
                nodes[node] = [];
                nodes[node].push(c);
            }
        });

        console.log(nodes);
        //1997: the paper “Consistent Hashing and Random Trees: Distributed Caching Protocols for Relieving Hot Spots on the World Wide Web”
        //2007: last.fm’s Ketama memcached client and Dynamo: Amazon’s Highly Available Key-value Store
    }




    //where each server is assigned multiple hash values based on its name or ID, 

    //REHASHING Hk(key) = [GetHash(key) + k * (1 + (((GetHash(key) >> 5) + 1) % (hashsize – 1)))] % hashsize 

    //Consistent hashing: special kind of hashing such that when a hash table is resized only a subset of keys need to be remapped (in normal hashes the position is a modular operation) used in Data partition and replication.

}