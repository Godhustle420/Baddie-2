# Baddie-2 Repository
Baddie-2 is a minimal repository currently containing only a README.md file. This repository is in its initial state and ready for development across multiple programming languages and frameworks.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively
- Repository state: This is a new repository with only README.md currently present.
- No build system, dependencies, or application code exists yet.
- The repository structure is minimal and ready for development.
- All standard development tools are available in the environment.

### Basic Repository Operations
- Check repository status: `git --no-pager status`
- View repository structure: `ls -la`
- List all files (excluding .git): `find . -type f ! -path "*/.git/*" | sort`
- Check git history: `git --no-pager log --oneline -10`
- View branches: `git --no-pager branch -a`
- Read README: `cat README.md`

### Development Environment
Available development tools and versions:
- Node.js: v20.19.5 with npm 10.8.2
- Python: 3.12.3 with pip
- Java: OpenJDK 17.0.16
- Go: 1.24.7
- Git: 2.51.0
- Build tools: make, gcc, g++, maven, gradle
- Docker is available

## Project Initialization
Since this is a minimal repository, you can initialize projects for various technologies:

### Node.js/JavaScript Project
- Initialize: `npm init -y` (creates package.json)
- Install dependencies: `npm install <package-names>`
- Common scripts: `npm run test`, `npm run build`, `npm run dev`
- NEVER CANCEL: npm install can take 2-5 minutes depending on dependencies.

### Python Project
- Create virtual environment: `python3 -m venv venv`
- Activate: `source venv/bin/activate`
- Install dependencies: `pip install <package-names>`
- Requirements file: `pip freeze > requirements.txt`
- Install from requirements: `pip install -r requirements.txt`

### Java Project
- Maven project: `mvn archetype:generate -DgroupId=com.example -DartifactId=baddie-2 -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false`
- Gradle project: `gradle init --type java-application`
- Build: `mvn clean compile` or `gradle build`
- NEVER CANCEL: Maven archetype generation takes ~12 seconds. Java builds can take 5-15 minutes. Set timeout to 30+ minutes.

### Go Project
- Initialize: `go mod init baddie-2`
- Add dependencies: `go get <package>`
- Build: `go build`
- Run: `go run main.go`

## Validation
- Always run `git --no-pager status` to check repository state before and after making changes.
- Test basic functionality of any code you add.
- Since this is a new repository, always validate that initialization commands work before committing.
- Always check that files are properly created after running setup commands.

## Common Tasks
The following are outputs from frequently run commands in the current state of the repository.

### Repository Root
```
ls -la
total 20
drwxr-xr-x 4 runner runner 4096 Sep 17 15:33 .
drwxr-xr-x 3 runner runner 4096 Sep 17 15:29 ..
drwxrwxr-x 7 runner runner 4096 Sep 17 15:33 .git
drwxrwxr-x 2 runner runner 4096 Sep 17 15:33 .github
-rw-rw-r-- 1 runner runner   10 Sep 17 15:30 README.md
```

### Current Files
```
find . -type f ! -path "*/.git/*" | sort
./README.md
```

### README Content
```
cat README.md
# Baddie-2
```

### Git Status
```
git --no-pager status
On branch copilot/fix-5
Your branch is up to date with 'origin/copilot/fix-5'.

nothing to commit, working tree clean
```

### Git History
```
git --no-pager log --oneline -5
9e4b92b (HEAD -> copilot/fix-5, origin/copilot/fix-5) Initial plan
bc9311e (grafted) Merge pull request #4 from Godhustle420/copilot/fix-12018df2-bbe3-48ac-a264-b8e5df50d20f
```

## Build and Test Guidelines
- Since no build system exists yet, validate all setup commands before adding them to the codebase.
- When adding build systems, always test the complete build process.
- NEVER CANCEL: Set appropriate timeouts for build commands (30+ minutes for complex builds).
- Always run linting and formatting tools if they are added to the project.
- Document exact commands that work in this environment.

## Development Workflow
1. Always check current repository state with `git --no-pager status`
2. For new projects, use appropriate initialization commands from the sections above
3. Make incremental changes and test frequently
4. Use `git --no-pager diff` to review changes before committing
5. Always validate that your changes work as expected

## Important Notes
- This repository is currently minimal - it only contains README.md and this instructions file
- The development environment has all major languages and tools available
- Always test commands in the actual repository context before relying on them
- When adding new technologies, follow standard initialization patterns for that ecosystem
- Set long timeouts for any build or installation commands to avoid premature cancellation