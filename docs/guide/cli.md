# Command Line Interface

This section about the cli.

## Requirements

```bash
pip install click
```

## Usage

```bash
py cli.py --help
```

```text
Usage: cli.py [OPTIONS] COMMAND [ARGS]...                                                                 
                                                                                                          
Options:                                                                                                  
  --help  Show this message and exit.                                                                     
                                                                                                          
Commands:                                                                                                 
  add:tailwind  integrate tailwindcss                                                                     
  add:vitest    integrate vitest                                                                          
  app:build     building application                                                                      
  app:create    create new app                                                                            
  app:version   check the latest version and auto update
```