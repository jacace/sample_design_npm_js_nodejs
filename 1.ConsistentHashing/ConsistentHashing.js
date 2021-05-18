module.exports = class ConsistentHashing {

    //intro: I want to distribute the keys across the servers so I can find them again    
    constructor() {
    }

    //returns the remainder of a division, after one number is divided
    //by another (i.e.: modulo of the operation)
    testModuloOperation() {
        let remainder = 10 % 1; //always zero
        console.log("Remainder is: " + remainder);

        remainder = 10 % 0; //undefined
        console.log("Remainder is: " + remainder);
    }

    //Solution 1: mod-N hashing
    testModNHashing() {
        var servers = ['emea', 'nam', 'apac', 'latam']
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

    //Solution 2: Consistent Hashing
    // a. It is a distributed hashing scheme that operates independently of the number of servers
    //    or objects in a distributed hash table by assigning them a position on an 
    //    abstract circle, or hash ring
    //    when a new node is added, only a subset (K/n) of keys need to be remapped
    // b. each server is assigned multiple hash values based on its name or ID, 
    //    and each request is assigned to the server with the “nearest” hash value. 
    // c. Consistent Hashing Is Used by Load Balancers to Distribute Requests, data Partitioning, etc
    testConsistentHashing() {
        var chLib = require('consistent-hashing');
        var servers = new chLib(['emea', 'nam', 'apac', 'latam']);

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

    //Solution 3: Rendezvous Hashing
    testRendezvousHashing()
    {

    }

    //Solution 4: Jump Consistent Hash
    testJumpConsistentHash()
    {

    }

    //REHASHING Hk(key) = [GetHash(key) + k * (1 + (((GetHash(key) >> 5) + 1) % (hashsize – 1)))] % hashsize     

}