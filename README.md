# emerald+
======= LIST OF COMMANDS =======
##### install <OS>      - Install Dependencies
##### run               - Run Application
##### -c || --create    - Create modules
                  Example:
                  ./app.sh -c <type> <name> -d <path>
                  ./app.sh --create <type> <name> --directory <path>
                  ./app.sh -c block testBlock -d test_block
                  <type>  - section | block | layout | template | public_control
                  <name>  - camelcase rule of naming files
                  <path>  - path will be created based on type of module. Note: Applicable only for blocks and public_control
##### -d || --delete    - Delete module
                  Example:
                  ./app.sh -d <type> <path>
                  ./app.sh --delete <type> <path>
                  <type>  - section | block | layout | template | public_control
                  <path>  - path to file

========== INSTALL ============
##### run ./app.sh install <OS> to install all dependencies
    Example:
        ./app.sh install redhat
        ./app.sh install fedora
        ./app.sh install ubuntu
        ./app.sh install suse
        ./app.sh install macosx
========= RUN ===========
##### run ./app.sh run
