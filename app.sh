#!/bin/bash

while [ "$1" != "" ]; do
  case $1 in
  -c | --create)

    if [ $2 = "block" ]; then
      if [ $4 = "-d" ] || [ $4 = "--directory" ];then
        mkdir -p -- "$PWD/static/blocks/$5/"
      fi

      echo "import {Control} from '../../application/controls/controls_collection.js';
import {Block} from '../../application/controls/block.js';

export class $3Block extends Block
{
    indexAction(){

    }

    listAction(){

    }

    viewAction(){

    }
}" >$PWD/static/blocks/$5/$5.js

echo "export const $3Style = \`\`;" >$PWD/static/blocks/$5/$5.style.js
echo "import {Unittest} from '../../application/controls/testing.js';
export class $3Test extends Unittest
{

}" >$PWD/static/blocks/$5/$5.test.js

    elif [ $2 = "section" ]; then
      echo $3>$PWD/static/application/config/config.js
    elif [ $2 = "template" ]; then
      echo "import {Control} from '../application/controls/controls_collection.js';
import {Template} from '../application/controls/template.js';

export class $3Template extends Template
{
    indexAction(){
    }

    listAction(){
    }

    viewAction(){
    }
}" >$PWD/static/templates/$3.js

    elif [ $2 = "layout" ]; then
      echo "import {Control} from '../application/controls/controls_collection.js';
import {Layout} from '../application/controls/layout.js';

export class $3Layout extends Layout
{
    RenderHead(){
        return super.RenderHead()
    }

    RenderBody(){
        return super.RenderBody()
    }
}" >$PWD/static/layouts/$3.js

    elif [ $2 = "public_control" ]; then
      if [ $4 = "-d" ] || [ $4 = "--directory" ];then
        mkdir -p -- "$PWD/static/public_controls/$5"
      fi
      echo "import {Control} from '../application/controls/controls_collection.js';

export class $3 extends Control
{
    constructor(){
        super(\"div\")
    }

    Render(){
        return super.Render()
    }
}" >$PWD/static/public_controls/$5/$5.js

echo "export const $3Style = \`\`;" >$PWD/static/public_controls/$5/$5.style.js
echo "import {Unittest} from '../../application/controls/testing.js';
export class $3Test extends Unittest
{

}" >$PWD/static/public_controls/$5/$5.test.js
    fi

    exit
    ;;

  -d | --delete)
    if [ $2 = "block" ]; then
      rmdir -r -- "$PWD/static/blocks/$3"
    elif [ $2 = "layout" ]; then
      rmdir -r -- "$PWD/static/layouts/$3"
    elif [ $2 = "template" ]; then
      rmdir -r -- "$PWD/static/templates/$3"
    elif [ $2 = "public_control" ]; then
      rmdir -r -- "$PWD/static/public_controls/$3"
    fi
    exit
    ;;

  -h | --help)
    echo "======= LIST OF COMMANDS =======
run               - Run Application
-c || --create    - Create modules
                  Example:
                  ./app.sh -c <type> <name> -d <path>
                  ./app.sh --create <type> <name> --directory <path>

                  ./app.sh -c block testBlock -d test_block

                  <type>  - section | block | layout | template | public_control
                  <name>  - camelcase rule of naming files
                  <path>  - path will be created based on type of module. Note: Applicable only for blocks and public_control


-d || --delete    - Delete module
                  Example:
                  ./app.sh -d <type> <path>
                  ./app.sh --delete <type> <path>

                  <type>  - section | block | layout | template | public_control
                  <path>  - path to file
"
    exit
    ;;
  install)

    if [ $2 = 'fedora' ]; then
      sudo dnf install nodejs
    elif [ $2 = 'redhat' ]; then
      sudo yum install nodejs
    elif [ $2 = 'ubuntu' ]; then
      sudo apt install nodejs
    elif [ $2 = 'suse' ]; then
      sudo zypper install nodejs
    elif [ $2 = 'macosx' ]; then
      xcode-select --install
      /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
      brew install node
    fi

    npm install electron
    npm install eslint --save-dev
    npm install mocha --save-dev

    npm start
    exit
    ;;
  run)
    npm start
    exit
    ;;
  esac
  shift
done
