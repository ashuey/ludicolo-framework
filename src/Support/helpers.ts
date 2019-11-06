import ApplicationContract from "../Contracts/Foundation/Application";
import RepositoryContract from "../Contracts/Config/Repository";
import Container from "@ashuey/ludicolo-container/lib/Container";

export function app(): ApplicationContract;

export function app<T = any>(abstract_: string): T;

export function app<T = any>(abstract_?: string): ApplicationContract | T {
    if (abstract_) {
        return Container.getInstance().make(abstract_);
    }

    return Container.getInstance().make('app');
}

export function app_path(...paths: string[]): string {
    return app().path(...paths);
}

export function base_path(...paths: string[]): string {
    return app().basePath(...paths);
}

export function env(key: string, default_: any = null): any {
    return process.env.hasOwnProperty(key) ? process.env[key] : default_;
}

export function config(key?: string, default_ = null): any {
    const config: RepositoryContract = app('config');

    return key ? config.get(key, default_) : config;
}