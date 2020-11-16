import {Control} from '../../controls_collection.js';

export class Grid extends Control
{
    constructor(Name='', RecordSet=''){
        super('div')
        this.Name = Name;
        this.RecordSet = RecordSet;
        this.PageSize = 15;
        this.pageButtonCount = 5;
        this.Fields = [];
        this.height = "400px";
        this.width = "400px";
    }

    Render(){
        this.Fields.push({ type: "control" });

        let div = new Control("div");
        div.id = this.Name;
        div.AfterRender=()=>{
            var db = {
                loadData: function(filter) {
                    return $.grep(this.record_set, function(client) {
                        return true;
                    });
                },
                insertItem: function(insertingClient) {
                    this.record_set.push(insertingClient);
                },
                updateItem: function(updatingClient) {
                },
                deleteItem: function(deletingClient) {
                    var clientIndex = $.inArray(deletingClient, this.record_set);
                    this.record_set.splice(clientIndex, 1);
                }
            };
            db.record_set = this.RecordSet;

            $(this.innerRef).jsGrid({
                height: this.height,
                width: this.width,
                filtering: true,
                editing: true,
                inserting: true,
                sorting: true,
                paging: true,
                autoload: true,
                pageSize: this.PageSize,
                pageButtonCount: this.pageButtonCount,
                confirmDeleting: false,
                controller: db,
                fields: this.Fields
            });
            window.db = db;
        };
        this.Controls.Add(div);

        return super.Render();
    }
}