import * as core from '@actions/core'
import {Octokit} from '@octokit/action'
import {restEndpointMethods} from '@octokit/plugin-rest-endpoint-methods'

import {Minimatch} from 'minimatch'
import * as fs from 'fs'
import * as readline from 'readline'

const PluginOctokit = Octokit.plugin(restEndpointMethods)
const client = new PluginOctokit()

const configPath = 'pr-allowed.txt'

async function loadFiles(): Promise<string[]> {
    if (process.env.GITHUB_REPOSITORY === undefined || process.env.GITHUB_EVENT_PATH === undefined) {
        throw new Error('environment variables not set correctly')
    }

    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')
    const pull_number = require(process.env.GITHUB_EVENT_PATH).number
    const per_page = 100

    let files: string[] = []
    let page = 1
    let more: boolean

    do {
        const {data} = await client.rest.pulls.listFiles({owner, repo, pull_number, per_page, page})

        files = files.concat(data.map(x => x.filename))

        more = data.length === per_page
        page += 1
    } while (more)

    return files
}

async function loadConfig(): Promise<Minimatch[]> {
    if (!fs.existsSync(configPath)) {
        throw new Error('config file does not exists at: ' + configPath)
    }

    const stream = fs.createReadStream(configPath, 'utf-8')
    const reader = readline.createInterface({input: stream})

    const matches = []

    for await (const line of reader) {
        matches.push(new Minimatch(line, {dot: true}))
    }

    return matches
}

loadFiles().then(files => {
    if (files.includes(configPath)) {
        throw new Error('config was modified')
    }

    loadConfig().then(config => {
        for (const file of files) {
            const found = config.map(x => x.match(file)).includes(true)

            if (!found) {
                throw new Error(`file "${file}" was not allowed`)
            }
        }
    })
}).catch(err => {
    core.setFailed(err.message)
})