"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.end = exports.installFeature = exports.installDevEnviroment = exports.installTypesNode = exports.installTSAndInit = exports.changePackageInfo = exports.initProjectDir = exports.selectFeature = exports.isFileExist = void 0;
/**
 * create 命令需要用到的所有方法
 */
var common_1 = require("../utils/common");
var fs_1 = require("fs");
var inquirer_1 = require("inquirer");
var chalk_1 = require("chalk");
var blue = chalk_1.default.blue, cyan = chalk_1.default.cyan, gray = chalk_1.default.gray, red = chalk_1.default.red, yellow = chalk_1.default.yellow;
var shell = require("shelljs");
var installFeatureMethod = require("./installFeature");
/**
 * 验证当前目录下是否已经存在指定文件，如果存在则退出进行
 * @param filename 文件名
 */
function isFileExist(filename) {
    // 文件路径
    var file = (0, common_1.getProjectPath)(filename);
    // 验证文件是否已经存在，存在则推出进程
    if ((0, fs_1.existsSync)(file)) {
        (0, common_1.printMsg)(red("".concat(file, " \u5DF2\u7ECF\u5B58\u5728")));
        process.exit(1);
    }
}
exports.isFileExist = isFileExist;
/**
 * 交互式命令行，让用户自己选择需要的功能
 * return ['ESLint', 'Prettier', 'CZ']
 */
function selectFeature() {
    return __awaiter(this, void 0, void 0, function () {
        var feature;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 清空命令行
                    (0, common_1.clearConsole)();
                    // 输出信息
                    /* eslint-disable @typescript-eslint/no-var-requires */
                    (0, common_1.printMsg)(blue("TS CLI v".concat(require("../../package.json").version)));
                    (0, common_1.printMsg)("Start initializing the project:");
                    (0, common_1.printMsg)("");
                    return [4 /*yield*/, (0, inquirer_1.prompt)([
                            {
                                name: "feature",
                                type: "checkbox",
                                message: "Check the features needed for your project",
                                choices: [
                                    { name: "ESLint", value: "ESLint" },
                                    { name: "Prettier", value: "Prettier" },
                                    { name: "CZ", value: "CZ" },
                                ],
                            },
                        ])];
                case 1:
                    feature = (_a.sent()).feature;
                    return [2 /*return*/, feature];
            }
        });
    });
}
exports.selectFeature = selectFeature;
/**
 * 初始化项目目录
 */
function initProjectDir(projectName) {
    shell.exec("mkdir ".concat(projectName));
    shell.cd(projectName);
    shell.exec("npm init -y");
}
exports.initProjectDir = initProjectDir;
/**
 * 改写项目中 package.json 的 name、description
 */
function changePackageInfo(projectName) {
    var packageJSON = (0, common_1.readJsonFile)("./package.json");
    packageJSON.name = packageJSON.description = projectName;
    (0, common_1.writeJsonFile)("./package.json", packageJSON);
}
exports.changePackageInfo = changePackageInfo;
/**
 * 安装 typescript 并初始化
 */
function installTSAndInit() {
    // 安装 typescript 并执行命令 tsc --init 生成 tsconfig.json
    shell.exec("npm i typescript -D && npx tsc --init");
    // 覆写 tsconfig.json
    var tsconfigJson = {
        compileOnSave: true,
        compilerOptions: {
            target: "ES2018",
            module: "commonjs",
            moduleResolution: "node",
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            inlineSourceMap: true,
            noImplicitThis: true,
            noUnusedLocals: true,
            stripInternal: true,
            pretty: true,
            declaration: true,
            outDir: "lib",
            baseUrl: "./",
            paths: {
                "*": ["src/*"],
            },
        },
        exclude: ["lib", "node_modules"],
    };
    (0, common_1.writeJsonFile)("./tsconfig.json", tsconfigJson);
    // 创建 src 目录和 /src/index.ts
    shell.exec("mkdir src && touch src/index.ts");
}
exports.installTSAndInit = installTSAndInit;
/**
 * 安装 @types/node
 * 这是 node.js 的类型定义包
 */
function installTypesNode() {
    shell.exec("npm i @types/node -D");
}
exports.installTypesNode = installTypesNode;
/**
 * 安装开发环境，支持实时编译
 */
function installDevEnviroment() {
    shell.exec("npm i ts-node-dev -D");
    /**
     * 在 package.json 的 scripts 中增加如下内容
     * "dev:comment": "启动开发环境",
     * "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
     */
    var packageJson = (0, common_1.readJsonFile)("./package.json");
    packageJson.scripts["dev:comment"] = "启动开发环境";
    packageJson.scripts["dev"] =
        "ts-node-dev --respawn --transpile-only src/index.ts";
    (0, common_1.writeJsonFile)("./package.json", packageJson);
}
exports.installDevEnviroment = installDevEnviroment;
/**
 * 安装用户选择的功能
 * @param feature 功能列表
 */
function installFeature(feature) {
    feature.forEach(function (item) {
        var func = installFeatureMethod["install".concat(item)];
        func();
    });
    // 安装 husky 和 lint-staged
    installHusky(feature);
    // 安装构建工具
    installFeatureMethod.installBuild(feature);
}
exports.installFeature = installFeature;
/**
 * 安装 husky 和 lint-staged，并根据功能设置相关命令
 * @param feature 用户选择的功能列表
 */
function installHusky(feature) {
    // feature 副本
    var featureBak = JSON.parse(JSON.stringify(feature));
    // 设置 hook
    var hooks = {};
    // 判断用户是否选择了 CZ，有则设置 hooks
    if (featureBak.includes("CZ")) {
        hooks["commit-msg"] = "commitlint -E HUSKY_GIT_PARAMS";
    }
    // 设置 lintStaged
    var lintStaged = [];
    if (featureBak.includes("ESLint")) {
        lintStaged.push("eslint");
    }
    if (featureBak.includes("Prettier")) {
        lintStaged.push("prettier");
    }
    installFeatureMethod.installHusky(hooks, lintStaged);
}
/**
 * 整个项目安装结束，给用户提示信息
 */
function end(projectName) {
    (0, common_1.printMsg)("Successfully created project ".concat(yellow(projectName)));
    (0, common_1.printMsg)("Get started with the following commands:");
    (0, common_1.printMsg)("");
    (0, common_1.printMsg)("".concat(gray("$"), " ").concat(cyan("cd " + projectName)));
    (0, common_1.printMsg)("".concat(gray("$"), " ").concat(cyan("npm run dev")));
    (0, common_1.printMsg)("");
}
exports.end = end;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRztBQUNILDBDQVF5QjtBQUN6Qix5QkFBZ0M7QUFDaEMscUNBQWtDO0FBQ2xDLCtCQUEwQjtBQUNsQixJQUFBLElBQUksR0FBOEIsZUFBSyxLQUFuQyxFQUFFLElBQUksR0FBd0IsZUFBSyxLQUE3QixFQUFFLElBQUksR0FBa0IsZUFBSyxLQUF2QixFQUFFLEdBQUcsR0FBYSxlQUFLLElBQWxCLEVBQUUsTUFBTSxHQUFLLGVBQUssT0FBVixDQUFXO0FBQ2hELCtCQUFpQztBQUNqQyx1REFBeUQ7QUFFekQ7OztHQUdHO0FBQ0gsU0FBZ0IsV0FBVyxDQUFDLFFBQWdCO0lBQzFDLE9BQU87SUFDUCxJQUFNLElBQUksR0FBRyxJQUFBLHVCQUFjLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMscUJBQXFCO0lBQ3JCLElBQUksSUFBQSxlQUFVLEVBQUMsSUFBSSxDQUFDLEVBQUU7UUFDcEIsSUFBQSxpQkFBUSxFQUFDLEdBQUcsQ0FBQyxVQUFHLElBQUksOEJBQU8sQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtBQUNILENBQUM7QUFSRCxrQ0FRQztBQUVEOzs7R0FHRztBQUNILFNBQXNCLGFBQWE7Ozs7OztvQkFDakMsUUFBUTtvQkFDUixJQUFBLHFCQUFZLEdBQUUsQ0FBQztvQkFDZixPQUFPO29CQUNQLHVEQUF1RDtvQkFDdkQsSUFBQSxpQkFBUSxFQUFDLElBQUksQ0FBQyxrQkFBVyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ25FLElBQUEsaUJBQVEsRUFBQyxpQ0FBaUMsQ0FBQyxDQUFDO29CQUM1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