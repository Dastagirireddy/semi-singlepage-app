/// <reference path="../../observable.ts" />
/// <reference path="../../concurrency/scheduler.ts" />

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvcngvdHMvY29yZS9saW5xL29ic2VydmFibGUvZnJvbWNhbGxiYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLEFBRUEsNENBRjRDO0FBQzVDLHVEQUF1RDtBQThGdEQiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9yeC90cy9jb3JlL2xpbnEvb2JzZXJ2YWJsZS9mcm9tY2FsbGJhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vb2JzZXJ2YWJsZS50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vY29uY3VycmVuY3kvc2NoZWR1bGVyLnRzXCIgLz5cbm1vZHVsZSBSeCB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBPYnNlcnZhYmxlU3RhdGljIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gRnVuY3Rpb24gd2l0aCBhIGNhbGxiYWNrIGFzIHRoZSBsYXN0IHBhcmFtZXRlciB0byBjb252ZXJ0IHRvIGFuIE9ic2VydmFibGUgc2VxdWVuY2UuXG4gICAgICAgICAqIEBwYXJhbSB7TWl4ZWR9IFtjb250ZXh0XSBUaGUgY29udGV4dCBmb3IgdGhlIGZ1bmMgcGFyYW1ldGVyIHRvIGJlIGV4ZWN1dGVkLiAgSWYgbm90IHNwZWNpZmllZCwgZGVmYXVsdHMgdG8gdW5kZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc2VsZWN0b3JdIEEgc2VsZWN0b3Igd2hpY2ggdGFrZXMgdGhlIGFyZ3VtZW50cyBmcm9tIHRoZSBjYWxsYmFjayB0byBwcm9kdWNlIGEgc2luZ2xlIGl0ZW0gdG8geWllbGQgb24gbmV4dC5cbiAgICAgICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uLCB3aGVuIGV4ZWN1dGVkIHdpdGggdGhlIHJlcXVpcmVkIHBhcmFtZXRlcnMgbWludXMgdGhlIGNhbGxiYWNrLCBwcm9kdWNlcyBhbiBPYnNlcnZhYmxlIHNlcXVlbmNlIHdpdGggYSBzaW5nbGUgdmFsdWUgb2YgdGhlIGFyZ3VtZW50cyB0byB0aGUgY2FsbGJhY2sgYXMgYW4gYXJyYXkuXG4gICAgICAgICAqL1xuICAgICAgICBmcm9tQ2FsbGJhY2s8VFJlc3VsdD4oZnVuYzogRnVuY3Rpb24sIGNvbnRleHQ6IGFueSwgc2VsZWN0b3I6IEZ1bmN0aW9uKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBPYnNlcnZhYmxlPFRSZXN1bHQ+O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBhbiBvYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdGlvbiBGdW5jdGlvbiB3aXRoIGEgY2FsbGJhY2sgYXMgdGhlIGxhc3QgcGFyYW1ldGVyIHRvIGNvbnZlcnQgdG8gYW4gT2JzZXJ2YWJsZSBzZXF1ZW5jZS5cbiAgICAgICAgICogQHBhcmFtIHtNaXhlZH0gW2NvbnRleHRdIFRoZSBjb250ZXh0IGZvciB0aGUgZnVuYyBwYXJhbWV0ZXIgdG8gYmUgZXhlY3V0ZWQuICBJZiBub3Qgc3BlY2lmaWVkLCBkZWZhdWx0cyB0byB1bmRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzZWxlY3Rvcl0gQSBzZWxlY3RvciB3aGljaCB0YWtlcyB0aGUgYXJndW1lbnRzIGZyb20gdGhlIGNhbGxiYWNrIHRvIHByb2R1Y2UgYSBzaW5nbGUgaXRlbSB0byB5aWVsZCBvbiBuZXh0LlxuICAgICAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24sIHdoZW4gZXhlY3V0ZWQgd2l0aCB0aGUgcmVxdWlyZWQgcGFyYW1ldGVycyBtaW51cyB0aGUgY2FsbGJhY2ssIHByb2R1Y2VzIGFuIE9ic2VydmFibGUgc2VxdWVuY2Ugd2l0aCBhIHNpbmdsZSB2YWx1ZSBvZiB0aGUgYXJndW1lbnRzIHRvIHRoZSBjYWxsYmFjayBhcyBhbiBhcnJheS5cbiAgICAgICAgICovXG4gICAgICAgIGZyb21DYWxsYmFjazxUUmVzdWx0LCBUMT4oZnVuYzogKGFyZzE6IFQxLCBjYWxsYmFjazogKHJlc3VsdDogVFJlc3VsdCkgPT4gYW55KSA9PiBhbnksIGNvbnRleHQ/OiBhbnksIHNlbGVjdG9yPzogRnVuY3Rpb24pOiAoYXJnMTogVDEpID0+IE9ic2VydmFibGU8VFJlc3VsdD47XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFuIG9ic2VydmFibGUgc2VxdWVuY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uIEZ1bmN0aW9uIHdpdGggYSBjYWxsYmFjayBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIgdG8gY29udmVydCB0byBhbiBPYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAgKiBAcGFyYW0ge01peGVkfSBbY29udGV4dF0gVGhlIGNvbnRleHQgZm9yIHRoZSBmdW5jIHBhcmFtZXRlciB0byBiZSBleGVjdXRlZC4gIElmIG5vdCBzcGVjaWZpZWQsIGRlZmF1bHRzIHRvIHVuZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3NlbGVjdG9yXSBBIHNlbGVjdG9yIHdoaWNoIHRha2VzIHRoZSBhcmd1bWVudHMgZnJvbSB0aGUgY2FsbGJhY2sgdG8gcHJvZHVjZSBhIHNpbmdsZSBpdGVtIHRvIHlpZWxkIG9uIG5leHQuXG4gICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiwgd2hlbiBleGVjdXRlZCB3aXRoIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIG1pbnVzIHRoZSBjYWxsYmFjaywgcHJvZHVjZXMgYW4gT2JzZXJ2YWJsZSBzZXF1ZW5jZSB3aXRoIGEgc2luZ2xlIHZhbHVlIG9mIHRoZSBhcmd1bWVudHMgdG8gdGhlIGNhbGxiYWNrIGFzIGFuIGFycmF5LlxuICAgICAgICAgKi9cbiAgICAgICAgZnJvbUNhbGxiYWNrPFRSZXN1bHQsIFQxLCBUMj4oZnVuYzogKGFyZzE6IFQxLCBhcmcyOiBUMiwgY2FsbGJhY2s6IChyZXN1bHQ6IFRSZXN1bHQpID0+IGFueSkgPT4gYW55LCBjb250ZXh0PzogYW55LCBzZWxlY3Rvcj86IEZ1bmN0aW9uKTogKGFyZzE6IFQxLCBhcmcyOiBUMikgPT4gT2JzZXJ2YWJsZTxUUmVzdWx0PjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gRnVuY3Rpb24gd2l0aCBhIGNhbGxiYWNrIGFzIHRoZSBsYXN0IHBhcmFtZXRlciB0byBjb252ZXJ0IHRvIGFuIE9ic2VydmFibGUgc2VxdWVuY2UuXG4gICAgICAgICAqIEBwYXJhbSB7TWl4ZWR9IFtjb250ZXh0XSBUaGUgY29udGV4dCBmb3IgdGhlIGZ1bmMgcGFyYW1ldGVyIHRvIGJlIGV4ZWN1dGVkLiAgSWYgbm90IHNwZWNpZmllZCwgZGVmYXVsdHMgdG8gdW5kZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc2VsZWN0b3JdIEEgc2VsZWN0b3Igd2hpY2ggdGFrZXMgdGhlIGFyZ3VtZW50cyBmcm9tIHRoZSBjYWxsYmFjayB0byBwcm9kdWNlIGEgc2luZ2xlIGl0ZW0gdG8geWllbGQgb24gbmV4dC5cbiAgICAgICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uLCB3aGVuIGV4ZWN1dGVkIHdpdGggdGhlIHJlcXVpcmVkIHBhcmFtZXRlcnMgbWludXMgdGhlIGNhbGxiYWNrLCBwcm9kdWNlcyBhbiBPYnNlcnZhYmxlIHNlcXVlbmNlIHdpdGggYSBzaW5nbGUgdmFsdWUgb2YgdGhlIGFyZ3VtZW50cyB0byB0aGUgY2FsbGJhY2sgYXMgYW4gYXJyYXkuXG4gICAgICAgICAqL1xuICAgICAgICBmcm9tQ2FsbGJhY2s8VFJlc3VsdCwgVDEsIFQyLCBUMz4oZnVuYzogKGFyZzE6IFQxLCBhcmcyOiBUMiwgYXJnMzogVDMsIGNhbGxiYWNrOiAocmVzdWx0OiBUUmVzdWx0KSA9PiBhbnkpID0+IGFueSwgY29udGV4dD86IGFueSwgc2VsZWN0b3I/OiBGdW5jdGlvbik6IChhcmcxOiBUMSwgYXJnMjogVDIsIGFyZzM6IFQzKSA9PiBPYnNlcnZhYmxlPFRSZXN1bHQ+O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBhbiBvYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdGlvbiBGdW5jdGlvbiB3aXRoIGEgY2FsbGJhY2sgYXMgdGhlIGxhc3QgcGFyYW1ldGVyIHRvIGNvbnZlcnQgdG8gYW4gT2JzZXJ2YWJsZSBzZXF1ZW5jZS5cbiAgICAgICAgICogQHBhcmFtIHtNaXhlZH0gW2NvbnRleHRdIFRoZSBjb250ZXh0IGZvciB0aGUgZnVuYyBwYXJhbWV0ZXIgdG8gYmUgZXhlY3V0ZWQuICBJZiBub3Qgc3BlY2lmaWVkLCBkZWZhdWx0cyB0byB1bmRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzZWxlY3Rvcl0gQSBzZWxlY3RvciB3aGljaCB0YWtlcyB0aGUgYXJndW1lbnRzIGZyb20gdGhlIGNhbGxiYWNrIHRvIHByb2R1Y2UgYSBzaW5nbGUgaXRlbSB0byB5aWVsZCBvbiBuZXh0LlxuICAgICAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24sIHdoZW4gZXhlY3V0ZWQgd2l0aCB0aGUgcmVxdWlyZWQgcGFyYW1ldGVycyBtaW51cyB0aGUgY2FsbGJhY2ssIHByb2R1Y2VzIGFuIE9ic2VydmFibGUgc2VxdWVuY2Ugd2l0aCBhIHNpbmdsZSB2YWx1ZSBvZiB0aGUgYXJndW1lbnRzIHRvIHRoZSBjYWxsYmFjayBhcyBhbiBhcnJheS5cbiAgICAgICAgICovXG4gICAgICAgIGZyb21DYWxsYmFjazxUUmVzdWx0LCBUMSwgVDIsIFQzLCBUND4oZnVuYzogKGFyZzE6IFQxLCBhcmcyOiBUMiwgYXJnMzogVDMsIGFyZzQ6IFQ0LCBjYWxsYmFjazogKHJlc3VsdDogVFJlc3VsdCkgPT4gYW55KSA9PiBhbnksIGNvbnRleHQ/OiBhbnksIHNlbGVjdG9yPzogRnVuY3Rpb24pOiAoYXJnMTogVDEsIGFyZzI6IFQyLCBhcmczOiBUMywgYXJnNDogVDQpID0+IE9ic2VydmFibGU8VFJlc3VsdD47XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFuIG9ic2VydmFibGUgc2VxdWVuY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uIEZ1bmN0aW9uIHdpdGggYSBjYWxsYmFjayBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIgdG8gY29udmVydCB0byBhbiBPYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAgKiBAcGFyYW0ge01peGVkfSBbY29udGV4dF0gVGhlIGNvbnRleHQgZm9yIHRoZSBmdW5jIHBhcmFtZXRlciB0byBiZSBleGVjdXRlZC4gIElmIG5vdCBzcGVjaWZpZWQsIGRlZmF1bHRzIHRvIHVuZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3NlbGVjdG9yXSBBIHNlbGVjdG9yIHdoaWNoIHRha2VzIHRoZSBhcmd1bWVudHMgZnJvbSB0aGUgY2FsbGJhY2sgdG8gcHJvZHVjZSBhIHNpbmdsZSBpdGVtIHRvIHlpZWxkIG9uIG5leHQuXG4gICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiwgd2hlbiBleGVjdXRlZCB3aXRoIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIG1pbnVzIHRoZSBjYWxsYmFjaywgcHJvZHVjZXMgYW4gT2JzZXJ2YWJsZSBzZXF1ZW5jZSB3aXRoIGEgc2luZ2xlIHZhbHVlIG9mIHRoZSBhcmd1bWVudHMgdG8gdGhlIGNhbGxiYWNrIGFzIGFuIGFycmF5LlxuICAgICAgICAgKi9cbiAgICAgICAgZnJvbUNhbGxiYWNrPFRSZXN1bHQsIFQxLCBUMiwgVDMsIFQ0LCBUNT4oZnVuYzogKGFyZzE6IFQxLCBhcmcyOiBUMiwgYXJnMzogVDMsIGFyZzQ6IFQ0LCBhcmc1OiBUNSwgY2FsbGJhY2s6IChyZXN1bHQ6IFRSZXN1bHQpID0+IGFueSkgPT4gYW55LCBjb250ZXh0PzogYW55LCBzZWxlY3Rvcj86IEZ1bmN0aW9uKTogKGFyZzE6IFQxLCBhcmcyOiBUMiwgYXJnMzogVDMsIGFyZzQ6IFQ0LCBhcmc1OiBUNSkgPT4gT2JzZXJ2YWJsZTxUUmVzdWx0PjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gRnVuY3Rpb24gd2l0aCBhIGNhbGxiYWNrIGFzIHRoZSBsYXN0IHBhcmFtZXRlciB0byBjb252ZXJ0IHRvIGFuIE9ic2VydmFibGUgc2VxdWVuY2UuXG4gICAgICAgICAqIEBwYXJhbSB7TWl4ZWR9IFtjb250ZXh0XSBUaGUgY29udGV4dCBmb3IgdGhlIGZ1bmMgcGFyYW1ldGVyIHRvIGJlIGV4ZWN1dGVkLiAgSWYgbm90IHNwZWNpZmllZCwgZGVmYXVsdHMgdG8gdW5kZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc2VsZWN0b3JdIEEgc2VsZWN0b3Igd2hpY2ggdGFrZXMgdGhlIGFyZ3VtZW50cyBmcm9tIHRoZSBjYWxsYmFjayB0byBwcm9kdWNlIGEgc2luZ2xlIGl0ZW0gdG8geWllbGQgb24gbmV4dC5cbiAgICAgICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uLCB3aGVuIGV4ZWN1dGVkIHdpdGggdGhlIHJlcXVpcmVkIHBhcmFtZXRlcnMgbWludXMgdGhlIGNhbGxiYWNrLCBwcm9kdWNlcyBhbiBPYnNlcnZhYmxlIHNlcXVlbmNlIHdpdGggYSBzaW5nbGUgdmFsdWUgb2YgdGhlIGFyZ3VtZW50cyB0byB0aGUgY2FsbGJhY2sgYXMgYW4gYXJyYXkuXG4gICAgICAgICAqL1xuICAgICAgICBmcm9tQ2FsbGJhY2s8VFJlc3VsdCwgVDEsIFQyLCBUMywgVDQsIFQ1LCBUNj4oZnVuYzogKGFyZzE6IFQxLCBhcmcyOiBUMiwgYXJnMzogVDMsIGFyZzQ6IFQ0LCBhcmc1OiBUNSwgYXJnNjogVDYsIGNhbGxiYWNrOiAocmVzdWx0OiBUUmVzdWx0KSA9PiBhbnkpID0+IGFueSwgY29udGV4dD86IGFueSwgc2VsZWN0b3I/OiBGdW5jdGlvbik6IChhcmcxOiBUMSwgYXJnMjogVDIsIGFyZzM6IFQzLCBhcmc0OiBUNCwgYXJnNTogVDUsIGFyZzY6IFQ2KSA9PiBPYnNlcnZhYmxlPFRSZXN1bHQ+O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBjYWxsYmFjayBmdW5jdGlvbiB0byBhbiBvYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdGlvbiBGdW5jdGlvbiB3aXRoIGEgY2FsbGJhY2sgYXMgdGhlIGxhc3QgcGFyYW1ldGVyIHRvIGNvbnZlcnQgdG8gYW4gT2JzZXJ2YWJsZSBzZXF1ZW5jZS5cbiAgICAgICAgICogQHBhcmFtIHtNaXhlZH0gW2NvbnRleHRdIFRoZSBjb250ZXh0IGZvciB0aGUgZnVuYyBwYXJhbWV0ZXIgdG8gYmUgZXhlY3V0ZWQuICBJZiBub3Qgc3BlY2lmaWVkLCBkZWZhdWx0cyB0byB1bmRlZmluZWQuXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzZWxlY3Rvcl0gQSBzZWxlY3RvciB3aGljaCB0YWtlcyB0aGUgYXJndW1lbnRzIGZyb20gdGhlIGNhbGxiYWNrIHRvIHByb2R1Y2UgYSBzaW5nbGUgaXRlbSB0byB5aWVsZCBvbiBuZXh0LlxuICAgICAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24sIHdoZW4gZXhlY3V0ZWQgd2l0aCB0aGUgcmVxdWlyZWQgcGFyYW1ldGVycyBtaW51cyB0aGUgY2FsbGJhY2ssIHByb2R1Y2VzIGFuIE9ic2VydmFibGUgc2VxdWVuY2Ugd2l0aCBhIHNpbmdsZSB2YWx1ZSBvZiB0aGUgYXJndW1lbnRzIHRvIHRoZSBjYWxsYmFjayBhcyBhbiBhcnJheS5cbiAgICAgICAgICovXG4gICAgICAgIGZyb21DYWxsYmFjazxUUmVzdWx0LCBUMSwgVDIsIFQzLCBUNCwgVDUsIFQ2LCBUNz4oZnVuYzogKGFyZzE6IFQxLCBhcmcyOiBUMiwgYXJnMzogVDMsIGFyZzQ6IFQ0LCBhcmc1OiBUNSwgYXJnNjogVDYsIGFyZzc6IFQ3LCBjYWxsYmFjazogKHJlc3VsdDogVFJlc3VsdCkgPT4gYW55KSA9PiBhbnksIGNvbnRleHQ/OiBhbnksIHNlbGVjdG9yPzogRnVuY3Rpb24pOiAoYXJnMTogVDEsIGFyZzI6IFQyLCBhcmczOiBUMywgYXJnNDogVDQsIGFyZzU6IFQ1LCBhcmc2OiBUNiwgYXJnNzogVDcpID0+IE9ic2VydmFibGU8VFJlc3VsdD47XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFuIG9ic2VydmFibGUgc2VxdWVuY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uIEZ1bmN0aW9uIHdpdGggYSBjYWxsYmFjayBhcyB0aGUgbGFzdCBwYXJhbWV0ZXIgdG8gY29udmVydCB0byBhbiBPYnNlcnZhYmxlIHNlcXVlbmNlLlxuICAgICAgICAgKiBAcGFyYW0ge01peGVkfSBbY29udGV4dF0gVGhlIGNvbnRleHQgZm9yIHRoZSBmdW5jIHBhcmFtZXRlciB0byBiZSBleGVjdXRlZC4gIElmIG5vdCBzcGVjaWZpZWQsIGRlZmF1bHRzIHRvIHVuZGVmaW5lZC5cbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3NlbGVjdG9yXSBBIHNlbGVjdG9yIHdoaWNoIHRha2VzIHRoZSBhcmd1bWVudHMgZnJvbSB0aGUgY2FsbGJhY2sgdG8gcHJvZHVjZSBhIHNpbmdsZSBpdGVtIHRvIHlpZWxkIG9uIG5leHQuXG4gICAgICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiwgd2hlbiBleGVjdXRlZCB3aXRoIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIG1pbnVzIHRoZSBjYWxsYmFjaywgcHJvZHVjZXMgYW4gT2JzZXJ2YWJsZSBzZXF1ZW5jZSB3aXRoIGEgc2luZ2xlIHZhbHVlIG9mIHRoZSBhcmd1bWVudHMgdG8gdGhlIGNhbGxiYWNrIGFzIGFuIGFycmF5LlxuICAgICAgICAgKi9cbiAgICAgICAgZnJvbUNhbGxiYWNrPFRSZXN1bHQsIFQxLCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3LCBUOD4oZnVuYzogKGFyZzE6IFQxLCBhcmcyOiBUMiwgYXJnMzogVDMsIGFyZzQ6IFQ0LCBhcmc1OiBUNSwgYXJnNjogVDYsIGFyZzc6IFQ3LCBhcmc4OiBUOCwgY2FsbGJhY2s6IChyZXN1bHQ6IFRSZXN1bHQpID0+IGFueSkgPT4gYW55LCBjb250ZXh0PzogYW55LCBzZWxlY3Rvcj86IEZ1bmN0aW9uKTogKGFyZzE6IFQxLCBhcmcyOiBUMiwgYXJnMzogVDMsIGFyZzQ6IFQ0LCBhcmc1OiBUNSwgYXJnNjogVDYsIGFyZzc6IFQ3LCBhcmc4OiBUOCkgPT4gT2JzZXJ2YWJsZTxUUmVzdWx0PjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYW4gb2JzZXJ2YWJsZSBzZXF1ZW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY3Rpb24gRnVuY3Rpb24gd2l0aCBhIGNhbGxiYWNrIGFzIHRoZSBsYXN0IHBhcmFtZXRlciB0byBjb252ZXJ0IHRvIGFuIE9ic2VydmFibGUgc2VxdWVuY2UuXG4gICAgICAgICAqIEBwYXJhbSB7TWl4ZWR9IFtjb250ZXh0XSBUaGUgY29udGV4dCBmb3IgdGhlIGZ1bmMgcGFyYW1ldGVyIHRvIGJlIGV4ZWN1dGVkLiAgSWYgbm90IHNwZWNpZmllZCwgZGVmYXVsdHMgdG8gdW5kZWZpbmVkLlxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc2VsZWN0b3JdIEEgc2VsZWN0b3Igd2hpY2ggdGFrZXMgdGhlIGFyZ3VtZW50cyBmcm9tIHRoZSBjYWxsYmFjayB0byBwcm9kdWNlIGEgc2luZ2xlIGl0ZW0gdG8geWllbGQgb24gbmV4dC5cbiAgICAgICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uLCB3aGVuIGV4ZWN1dGVkIHdpdGggdGhlIHJlcXVpcmVkIHBhcmFtZXRlcnMgbWludXMgdGhlIGNhbGxiYWNrLCBwcm9kdWNlcyBhbiBPYnNlcnZhYmxlIHNlcXVlbmNlIHdpdGggYSBzaW5nbGUgdmFsdWUgb2YgdGhlIGFyZ3VtZW50cyB0byB0aGUgY2FsbGJhY2sgYXMgYW4gYXJyYXkuXG4gICAgICAgICAqL1xuICAgICAgICBmcm9tQ2FsbGJhY2s8VFJlc3VsdCwgVDEsIFQyLCBUMywgVDQsIFQ1LCBUNiwgVDcsIFQ4LCBUOT4oZnVuYzogKGFyZzE6IFQxLCBhcmcyOiBUMiwgYXJnMzogVDMsIGFyZzQ6IFQ0LCBhcmc1OiBUNSwgYXJnNjogVDYsIGFyZzc6IFQ3LCBhcmc4OiBUOCwgYXJnOTogVDksIGNhbGxiYWNrOiAocmVzdWx0OiBUUmVzdWx0KSA9PiBhbnkpID0+IGFueSwgY29udGV4dD86IGFueSwgc2VsZWN0b3I/OiBGdW5jdGlvbik6IChhcmcxOiBUMSwgYXJnMjogVDIsIGFyZzM6IFQzLCBhcmc0OiBUNCwgYXJnNTogVDUsIGFyZzY6IFQ2LCBhcmc3OiBUNywgYXJnODogVDgsIGFyZzk6IFQ5KSA9PiBPYnNlcnZhYmxlPFRSZXN1bHQ+O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==