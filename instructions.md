# Connecting to the Bitcoin Network

Specter can be configured to connect to the bitcoin network via Bitcoin Core - this is the default option and is the least demanding on your server. However it will be very slow to rescan after adding a new wallet. Electrs can be used instead which will be far faster, but is not advisible if you are running less powerful hardware.

You can also connect via Bitcoin Proxy which is the same as connecting directly to Bitcoin Core but allows you to be running a pruned node rather than an archival node. If you are running a Server Lite this is the correct choice.

# Using a Signing Device with Specter

If you would like to know how to use a signing device with Specter please see see our documentation [here](https://docs.start9.com/latest/user-manual/service-guides/specter/specter-service)

# Using your local Mempool service as a block explorer

If you'd like to use your own Mempool to open links in Specter head to "Settings" -> "Block Explorer URL" and input either the .local or .onion address of your Mempool service.