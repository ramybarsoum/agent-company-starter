#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = resolve(__dirname, '..');

const args = process.argv.slice(2);
const command = args[0];

const RESET = '\x1b[0m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

function log(msg) { console.log(msg); }
function success(msg) { console.log(`${GREEN}${msg}${RESET}`); }
function info(msg) { console.log(`${CYAN}${msg}${RESET}`); }
function warn(msg) { console.log(`${YELLOW}${msg}${RESET}`); }

function printHelp() {
  log('');
  log(`${BOLD}agent-company-starter${RESET} — Bootstrap an AI agent company`);
  log('');
  log(`${BOLD}Usage:${RESET}`);
  log(`  npx agent-company-starter init [dir]    Create a new agent company`);
  log(`  npx agent-company-starter skills        Install skills to current project`);
  log(`  npx agent-company-starter help           Show this help`);
  log('');
  log(`${BOLD}Commands:${RESET}`);
  log('');
  log(`  ${CYAN}init [dir]${RESET}`);
  log('    Scaffolds a complete agent company in the target directory.');
  log('    Copies: company-template/, .claude/, CLAUDE.md, playbook/');
  log('    Default dir: current directory.');
  log('');
  log(`  ${CYAN}skills${RESET}`);
  log('    Installs only .claude/skills/ and .claude/sub-agents/ to the');
  log('    current project. Use this to add skills to an existing repo.');
  log('');
  log(`${BOLD}Examples:${RESET}`);
  log(`  npx agent-company-starter init my-company`);
  log(`  npx agent-company-starter init`);
  log(`  npx agent-company-starter skills`);
  log('');
  log(`${BOLD}After init:${RESET}`);
  log('  1. Open the directory in Claude Code');
  log('  2. Run /agent-company-starter to start the founder interview');
  log('  3. The skill auto-generates VISION.md, CEO files, and bootstrap');
  log('');
}

function countFilesInDir(dir) {
  let count = 0;
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      if (entry.name === '.git') continue;
      const full = join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else count++;
    }
  }
  if (existsSync(dir)) walk(dir);
  return count;
}

function initCommand(targetDir) {
  const dest = resolve(process.cwd(), targetDir || '.');

  log('');
  log(`${BOLD}Agent Company Starter${RESET}`);
  log(`${DIM}Bootstrapping agent company in: ${dest}${RESET}`);
  log('');

  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  // Copy company template
  info('  Copying company template...');
  cpSync(join(packageRoot, 'company-template'), join(dest, 'company-template'), { recursive: true });

  // Copy .claude (skills + sub-agents)
  info('  Installing skills and sub-agents...');
  cpSync(join(packageRoot, '.claude'), join(dest, '.claude'), { recursive: true });

  // Copy playbook
  info('  Copying playbook...');
  cpSync(join(packageRoot, 'playbook'), join(dest, 'playbook'), { recursive: true });

  // Copy Vision skill
  info('  Copying Vision interview skill...');
  cpSync(join(packageRoot, 'skill'), join(dest, 'skill'), { recursive: true });

  // Copy CLAUDE.md
  info('  Installing CLAUDE.md (self-learning framework)...');
  const claudeMd = join(packageRoot, 'CLAUDE.md');
  if (existsSync(claudeMd)) {
    const destClaudeMd = join(dest, 'CLAUDE.md');
    if (existsSync(destClaudeMd)) {
      warn('  CLAUDE.md already exists. Saved new version as CLAUDE.agent-company-starter.md');
      cpSync(claudeMd, join(dest, 'CLAUDE.agent-company-starter.md'));
    } else {
      cpSync(claudeMd, destClaudeMd);
    }
  }

  // Create directories that agents need
  mkdirSync(join(dest, 'knowledge'), { recursive: true });
  mkdirSync(join(dest, 'decisions'), { recursive: true });
  mkdirSync(join(dest, 'quality'), { recursive: true });

  const totalFiles = countFilesInDir(dest);

  log('');
  success(`  Done! ${totalFiles} files installed.`);
  log('');
  log(`${BOLD}What's included:${RESET}`);
  log(`  ${CYAN}company-template/${RESET}  Agent definitions (CEO, QA, Worker), company files, 26 skills`);
  log(`  ${CYAN}.claude/skills/${RESET}    27 skills (auto-loaded by Claude Code)`);
  log(`  ${CYAN}.claude/sub-agents/${RESET} 13 review panel agents`);
  log(`  ${CYAN}playbook/${RESET}          Three-layer verification docs, lessons from production`);
  log(`  ${CYAN}CLAUDE.md${RESET}          Self-learning framework (knowledge, decisions, quality)`);
  log('');
  log(`${BOLD}Next steps:${RESET}`);
  log(`  1. ${CYAN}cd ${targetDir || '.'}${RESET}`);
  log(`  2. Open in Claude Code`);
  log(`  3. Run ${CYAN}/agent-company-starter${RESET} to start the founder interview`);
  log(`  4. The interview generates VISION.md, CEO agent files, and bootstrap`);
  log('');
}

function skillsCommand() {
  const dest = process.cwd();

  log('');
  log(`${BOLD}Installing skills to current project${RESET}`);
  log(`${DIM}Target: ${dest}${RESET}`);
  log('');

  // Copy .claude/skills
  info('  Installing skills...');
  cpSync(join(packageRoot, '.claude', 'skills'), join(dest, '.claude', 'skills'), { recursive: true });

  // Copy .claude/sub-agents
  info('  Installing sub-agents...');
  cpSync(join(packageRoot, '.claude', 'sub-agents'), join(dest, '.claude', 'sub-agents'), { recursive: true });

  const skillCount = readdirSync(join(dest, '.claude', 'skills')).length;
  const agentCount = readdirSync(join(dest, '.claude', 'sub-agents')).length;

  log('');
  success(`  Done! ${skillCount} skills + ${agentCount} sub-agents installed.`);
  log('');
  log(`  Skills are now available as slash commands in Claude Code.`);
  log(`  Run ${CYAN}/agent-company-starter${RESET} to bootstrap a full company.`);
  log('');
}

// Main
switch (command) {
  case 'init':
    initCommand(args[1]);
    break;
  case 'skills':
    skillsCommand();
    break;
  case 'help':
  case '--help':
  case '-h':
  case undefined:
    printHelp();
    break;
  default:
    warn(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}
