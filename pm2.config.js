module.exports = {
    apps: [
        {
            name: "ugc-agency",
            script: "npm",
            args: "start",
            env: {
                PORT: 3000,
                NODE_ENV: "production",
            },
            // Restart on failure
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
        },
    ],
};
