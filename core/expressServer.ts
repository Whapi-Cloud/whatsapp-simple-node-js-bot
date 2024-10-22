import express from "express";
import cors from "cors";
import http from "http";
import { Express } from "express-serve-static-core";
import { handler } from "../endpoints/hook"

const allowedOrigins = ["http://panel.whapi.cloud", "https://localhost"]; // allowed urls for get requests

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = "The domain is not allowed by CORS policy";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
};

export class ExpressServer {
    private readonly port: number;
    private readonly app: Express;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.setupMiddleware();
    }

    setupMiddleware() {
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.post("/hook", handler);
    }

    launch() {
        this.app.use((req, res, next) => {
            res.setHeader("X-Powered-By", "Whapi-Cloud Simple Node Js Bot v1.0.0");
            const ip = req.headers["x-forwarded-for"] || req["remoteAddress"];
            next();
        });

        http.createServer(this.app).listen(this.port); // start server
        console.log(`Listening on port ${this.port}`);
    }
}
