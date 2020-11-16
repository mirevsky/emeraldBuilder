export const BuilderStyle = `
@font-face {
  font-family: 'Comfortaa';
  src: url('fonts/Comfortaa-VariableFont_wght.ttf');
}
@font-face {
  font-family: 'OpenSans';
  src: url('fonts/Open_Sans/OpenSans-Regular.ttf');
}

html{
    height:100% !important;
    background:#eaeaea !important;
    margin:0px !important;
    padding:0px !important;
    overflow:hidden !important;
}
body
{
    font-family:'OpenSans';
    margin:24px !important;
    padding:40px !important;
    height:calc(100% - 80px - 48px) !important;
    background:#fff !important;
    border:solid 1px #ccc !important;
    -webkit-box-shadow:0 0 10px #ccc !important;
    -moz-box-shadow:0 0 10px #ccc !important;
    box-shadow:0 0 10px #ccc !important;
    font-size:1vw;
    overflow:auto !important;
}

.logo
{
    font-family: 'Comfortaa';
    font-weight: 300;
    color: #019875;
}

/** SCROLLBAR **/
/* width */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar:horizontal{
    height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#loading{
    -webkit-box-shadow:0 0 20px rgba(0,0,0,0.8);
    -moz-box-shadow:0 0 20px rgba(0,0,0,0.8);
    box-shadow:0 0 20px rgba(0,0,0,0.8);
    background:#019875;
    position:absolute;
    z-index:999;
    top:0px;
    left:0px;
}
`;

export const BuilderRightMenuStyle = `
& {
    position:absolute;
    padding:0px;
    height:100%;
    width:16px;
    top:0px;
    right:0px;

    overflow:hidden;
    border-left:solid 1px #fff;
    -webkit-box-shadow: -1px 0px 0px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px 0px 0px 0px rgba(0,0,0,0.75);
    box-shadow: -1px 0px 0px 0px rgba(0,0,0,0.75);
    z-index:899;
}

&:hover{
    width:auto;
}
& > ul{
    margin:0px;
    padding:0px;
    display:table;
    height:100%;
    background:#f0f0f0;
    opacity:0.9;
}

& > ul > li{
    margin:0px;
    padding:0px;
    list-style-type:none;
    display:table-cell;
    vertical-align:top;
    height:100%;
}

& a.button_new
{
    height:48px;
    display:block;
    text-align:center;
}

& a.button_new > img
{
    height:48px;
    width:48px;
}

& > ul{
    height:100%;
}

& > ul > li.right_menu_tabs{
    width:22px;
    height:calc(100% - 90px);
    padding-top:90px;
    border-right:solid 0px #ccc;
    opacity:0.9;
}

& > ul > li.right_menu_tabs img{
    height:16px;
    width:16px;
    margin:-20px 0px;
    display:inline-block;
    float:left;
}

& > ul > li.right_menu_tabs > div{
    position:relative;
    display:block;
    //width:22px;
    text-align:center;
    vertical-align:middle;
}

& > ul > li.right_menu_tabs label:hover{
    cursor:pointer;
}

& > ul > li.right_menu_tabs a{
    text-decoration:none;
    color:#333;
    display:inline-block;
    height:16px;
    padding:35px 0px;
    width:0;
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    transform: rotate(270deg);
}
& > ul > li.right_menu_tabs label{
    height:22px;
    display:inline-block;
    margin-left:22px;
    text-align:center;
    font-weight:bold;
}
& > ul > li.right_menu_tabs label:hover{
    color:#019875;
}

& > ul > li.right_menu_tabs > div{
    display:inline-block;
    width:16px;
}

.RightMenuNavigation{
    height:calc(100% - 48px);
    width: 125px;
    overflow-x:hidden;
    overflow-y: auto;
    display:block;
}

.RightMenuNavigation a {
    margin:1px 2px;
    border:solid 2px #333;
    border-top:solid 8px #333;
    width: 115px;
    text-align:center;
    vertical-align:middle;
    display: flex;
    position:relative;
    justify-content: center;
    align-items: center;
    mix-height:64px;
    height:64px;
    max-height:64px;
    text-decoration:none;
    color: #333;
    word-wrap: break-word;
    font-size: 10pt;
    -webkit-border-radius: 3px;
-moz-border-radius: 3px;
border-radius: 3px;
}

.RightMenuNavigation a:hover{
    -webkit-box-shadow: 0px 0px 5px 0px rgba(1,152,117,1);
    -moz-box-shadow: 0px 0px 5px 0px rgba(1,152,117,1);
    box-shadow: 0px 0px 5px 0px rgba(1,152,117,1);
}
div.RightMenuNavigation > div.layouts > a
{
    background: url(../application/theme/default/code.gif); 50% 50% no-repeat;
    background-size:cover;
}

div.RightMenuNavigation > div.templates > a
{
    background: url(../application/theme/default/code.gif); 50% 50% no-repeat;
    background-size:cover;
}

div.RightMenuNavigation > div.blocks > a
{
    background: url(../application/theme/default/code.gif); 50% 50% no-repeat;
    background-size:cover;
}

div.RightMenuNavigation > div img
{
    height: 16px;
    width: 16px;
    position: absolute;
    bottom: 5px;
    left: 5px;
}

div.sub_section{
    /*position: absolute;
    top: 74px;
    left: 10px;*/
    margin-left:10px;
    display:none;
}

div.sub_section_div{
    position:relative;
}

`;

export const BuilderLeftMenuStyle = `
&:hover{
    width:auto;
}
& {
    line-height: 0;
    position:absolute;
    height:auto;
    width:12px;
    padding:5px;
    top:30%;
    left:0px;
   /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#e5e5e5+0,ffffff+100 */
    background: #e5e5e5; /* Old browsers */
    background: -moz-linear-gradient(left,  #e5e5e5 0%, #ffffff 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  #e5e5e5 0%,#ffffff 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  #e5e5e5 0%,#ffffff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e5e5e5', endColorstr='#ffffff',GradientType=1 ); /* IE6-9 */

    border:solid 1px #ccc;
    -webkit-border-top-right-radius: 10px;
    -webkit-border-bottom-right-radius: 10px;
    -moz-border-radius-topright: 10px;
    -moz-border-radius-bottomright: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border:-left:solid 0px #ccc;
    -webkit-box-shadow:0 0 10px #ccc;
    -moz-box-shadow:0 0 10px #ccc;
    box-shadow:0 0 10px #ccc;
}

& > div div > a {
    height:48px;
    width:48px;
    position:absolute;
    display:block;
    top:0px;
    left:0px;
    z-index:99;
}
& > div > div > span
{
    left:48px;
}
& > div > div > img {
    height:48px;
    width:48px;
    position:absolute;
    top:0px;
    right:0px;
}
.BuilderLeftMenuButton {
    position:relative;
    height:48px;
    width:12px;
    overflow:hidden;
}

&:hover div.BuilderLeftMenuButton{
    width:48px;
}
`;
export const BuilderMainNavigationStyle = `
&{
    line-height:9pt;
    position:absolute;
    bottom:10px;
    left: 10px;
    font-size:10pt;
    z-index:900;

    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;

    background:#000;
    opacity:0.8;

    -webkit-box-shadow:0 0 10px #ccc;
    -moz-box-shadow:0 0 10px #ccc;
    box-shadow:0 0 10px #ccc;
    padding:3px;
}

& a{
    text-decoration:none;
    color:#fff;
    display:inline-block;
    vertical-align:middle;
}
& label{
    height:16px;
    display:inline-block;
    margin:0px 10px;
    vertical-align:middle;
    color:#fff;
}


& > span.navi
{
    display:inline-block;
}

& > span.navi > img
{
    height:10pt;
    display:inline-block;
    vertical-align:middle;
    margin-bottom:-5px;
}

& > span.navi > div.Tooltip{
    display:inline-block;
    vertical-align:middle;
}



& span.TooltipTop{
    bottom:22px;
    left:-32px;
}

`;
export const BuilderPreviewStyle = `
&
{
    position:absolute;
    z-index:899;
    bottom:10px;
    left:calc(50% - 50px);
    padding:0px !important;
    margin:0px !important;
    display:none;
    background: #000;
    opacity:0.8;
    font-size:10pt;
    -webkit-border-radius: 5vw;
    -moz-border-radius: 5vw;
    border-radius: 5vw;
    overflow:hidden;
}

& > li
{
    padding:0px !important;
    margin:0px !important;
    display:inline-block;
    list-style-type:none;
    vertical-align:middle !important;
}

& > li > a
{
    display:inline-block;
    padding:5px !important;
    vertical-align:middle !important;
    margin:0px !important;
    color: #fff;
    text-decoration:none;
    text-transform: capitalize;
}

& > li > a:hover
{
    color:#fff;
    background:#555;
}

& > li > a.active
{
    color:#fff;
    background:#555;
}
`;

export const BuilderCodeEditorStyle = `
&{
    display:none;
    width:50%;
    height: 100%;
    position:absolute;
    border-left:solid 3px #bbb;
    left:50%;
    top:0px;
    z-index:50;
    font-size:10pt;
}

& > div{
    height:100%;
}

& #navigation_tabs{
    display:inline-block;
    margin:0px 5px;
    margin-left: 0px;
    padding:0px;
    vertical-align:top;
}
& #navigation_tabs li{
    display:inline-block;
    margin:0px 0px -1px 0px;
    padding:0px 5px 0px 5px;
    list-style-type:none;
    border:solid 1px #ccc;
    border-left:solid 0px #ccc;
    background:#fff;
    height:18px;
}

& #navigation_tabs li.active{
    border-bottom:solid 1px #fff;
    margin:0px 0px -1px 0px;
    padding:0px 5px 0px 5px;
}

& #navigation_tabs img{
    height:12px;
    width:12px;
    margin:-5px 0px 0px 5px;
    padding:0px;
    vertical-align:middle;
}

& #navigation_tabs a{
    text-decoration:none;
    color:#000;
}

& div.code_editor_menu{
    background:#fff;
    border-top:solid 1px #ccc;
    border-bottom:solid 1px #ccc;
    padding:0px 3px;
}

& div.code_editor_menu img{
    height:16px;
    width:16px;
    padding:3px;
}
`;

export const BuilderCodeEditorTabsStyle = `
& {
    position:relative;
    height:100%;
    width:100%;
}
& > ul {
    top:15px;
    right: 20px;
    position:absolute;
    z-index:800;
    background: #000;
    opacity:0.8;
    color: #fff;
    -webkit-border-radius: 5vw;
    -moz-border-radius: 5vw;
    border-radius: 5vw;
    overflow:hidden;
    width:auto;
}
& > ul > ol{
    position:relative;
    border:solid 0px red;
}

& > ul > ol > li{
    border:solid 0px red;
    display:table-cell;
}

& > ul > ol > li > a{
    color:#fff;
    text-decoration:none;
    padding:3px 5px;
    display:inline-block;
}

& > div.TabsContent{
    height:100%;
    width:100%;
    background:#fff;
    border:solid 0px red;
    overflow:hidden;
}
& > div.TabsContent > div{
    height:100%;
    width:100%;
}
& > div.TabsContent > div > div{
    height:100%;
    width:100%;
    position:relative;
}
`;

export const BuilderCodeMirrorEditorTabsStyle = `
& {
  height:calc(100% - 22px);
}
`

export const BuilderFileNavigationStyle = `

`

export const BuilderSectionsStyle = `
& #section_form {

}

& #section_form > fieldset
{
    display:inline-block;
    vertical-align:top;
}
& #section_form > fieldset label{
    display:inline-block;
    width:120px;
    vertical-align:top;
}
`