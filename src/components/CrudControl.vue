<template>
  <section>

    <header class="my-3">
        <b-form inline style="display:flex">
            <b-button variant="success" @click="createItem()" class="mr-2">
                Create
            </b-button>
            <b-form-input 
                type="text"
                placeholder="Search"
                v-model="filter" 
                @input="debouncedSearch()"
                class="mr-2">
            </b-form-input>
            <div style="display:inline-block; flex-grow:1;">
                <slot name="extra-filter" ></slot>
            </div>
            <div class="ml-2" style="display: inline-block">
                <span class="mr-1">View</span>
                <b-form-select v-model="pageSize" :options="pageSizeOptions" @input="debouncedSearch()">
                </b-form-select>
            </div>
        </b-form>
    </header>

    <slot name="pre-table"></slot>

    <p v-if="loading" class="text-center">Loading...</p>

    <b-table striped bordered 
        v-if="!loading"
        :items="tableSource"
        :fields="tableFields"
        show-empty>
        <span slot="HEAD_actions"></span>
        <span slot="actions" slot-scope="data">
            <b-button size="sm" variant="primary" @click.stop="editItem(data.item, data.index)">Edit</b-button>
            <b-button size="sm" variant="danger" @click.stop="deleteItem(data.index)">Delete</b-button>
        </span>
        <span slot="empty">No records found</span>
    </b-table>

    <b-pagination size="md" :total-rows="totalRecords" v-model="pageNumber" :per-page="pageSize" @input="debouncedSearch()" class="float-right">
    </b-pagination>


    <b-modal
        size="lg"
        v-model="formModalIsActive">

        <h5 slot="modal-header">{{isCreate ? 'Create' : 'Edit'}} {{itemName}}</h5>

        <component :is="form" @valid="handleFormValid" v-model="selectedData"></component>

        <div slot="modal-footer">
            <b-button variant="success" :disabled="!formValid" @click="submit()">Save</b-button>
            <b-button @click="hideModals()">Cancel</b-button>
        </div>
    </b-modal>

    <b-modal 
        size="md" 
        v-model="deleteModalIsActive">
        <h5 slot="modal-header">Delete {{itemName}}</h5>
        <slot name="delete-message" :item="selectedData">
            <p>Are you sure you wish to delete this item?</p>
        </slot>
        <div slot="modal-footer">
            <b-button variant="success" @click="confirmDelete()">Confirm</b-button>
            <b-button @click="hideModals()">Cancel</b-button>
        </div>
    </b-modal>


  </section>
</template>

<script>
import { debounce } from 'lodash';

export default {
    name: 'crud-control',
    data: function(){
        return {
            formModalIsActive: false,
            deleteModalIsActive: false,
            selectedData: {},
            formValid: false,
            isCreate: false,   
            pageSizeOptions: [2,10,25,50,100],
            pageNumber: 1,
            pageSize: 10,
            filter: '',
        }
    },
    props: {
        data: Array,
        totalRecords: Number,
        transform: Object, // assume a dictionary for labels with function for create the value
        form: Object, // assume a vue component
        itemName: String,
        saving: { // property to be synced by parent component. allows crud control to pick up when parent finished submitting
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
    },
    mounted: function(){
        this.triggerSearch();
    },
    computed:{
        tableSource: function(){
            // map each data row based on transform and convert to new record to be displayed in Bootstrap table
            const keys = Object.keys(this.transform);
            return this.data.map(x => {
                const tempDetails = keys.map(k => { 
                    const mappedValue = this.transform[k](x);
                    return [k, mappedValue]; // temp array of fieldName, fieldContent
                });
                const record = tempDetails.reduce((acc, val) => {
                    const field = val[0];
                    const content = val[1];
                    acc[field] = content;
                    return acc;
                }, {});
                return record;
            });
        },
        tableFields: function(){
            // build up list of fields and attach extra field to hold action buttons
            const fields = Object.keys(this.transform).map(x => ({
                key: x
            }));
            fields.push({
                key: 'actions',
                label:''
            });
            return fields;
        },
    },
    methods: {
        createItem(){
            this.selectedData = {};
            this.isCreate = true;
            this.formModalIsActive = true;
        },
        editItem(item, index){
            const record = this.data[index];
            this.selectedData = record;
            this.isCreate = false;
            this.formModalIsActive = true;
        },
        deleteItem(index){
            const record = this.data[index];
            this.selectedData = record;
            this.deleteModalIsActive = true;
        },
        hideModals(){
            this.formModalIsActive = false;
            this.deleteModalIsActive = false;
        },
        handleFormValid(isValid){
            this.formValid = isValid;
        },
        submit(){
            if(!this.formValid || this.saving)
                return;

            if(this.isCreate)
                this.$emit('create', this.selectedData);
            else
                this.$emit('edit', this.selectedData);
        },
        confirmDelete(){
            if(this.saving)
                return;

            this.$emit("delete", this.selectedData);
        },
        debouncedSearch: debounce(function() {
            this.triggerSearch();
        }, 300),
        triggerSearch() {
            const terms = {
                filter: this.filter,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }
            this.$emit("search", terms);
        },
    },
    watch:{
        saving: function(val, oldVal){
            if(oldVal && !val){
                this.hideModals();
            }
        }
    }
}
</script>

<style>

</style>
