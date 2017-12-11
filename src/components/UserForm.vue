<template>
  <b-container fluid>
        <b-row>
            <b-col>
                <b-form-group label="First Name" :state="isSuccess($v.firstName)" class="required">
                    <b-form-input v-model="firstName" :state="isSuccess($v.firstName)" @input="detectUpdate($v.firstName)" />
                    <span slot="invalid-feedback">First name is required</span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Last Name" :state="isSuccess($v.lastName)" class="required">
                    <b-form-input v-model="lastName" :state="isSuccess($v.lastName)" @input="detectUpdate($v.lastName)" />
                    <span slot="invalid-feedback">Last name is required</span>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-form-group label="Email" :state="isSuccess($v.email)" class="required">
                    <b-form-input v-model="email" :state="isSuccess($v.email)" @input="detectUpdate($v.email)" />
                    <span slot="invalid-feedback">
                        <template v-if="!$v.email.email">Enter a valid email</template>
                        <template v-else-if="!$v.email.required">Email is required</template>
                    </span>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="Gender" :state="isSuccess($v.gender)" class="required">
                    <b-form-radio-group class="pt-2" v-model="gender" :state="isSuccess($v.gender)" @input="detectUpdate($v.gender)">
                        <b-form-radio value="male">Male</b-form-radio>
                        <b-form-radio value="female">Female</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
            </b-col>
        </b-row>

    </b-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import VueTypes from "vue-types";

export default {
    name: 'UserForm',
    props:{
        value: VueTypes.shape({
            firstName: String,
            lastName: String,
            email: String,
            gender: String,
            id: Number,
        }) 
    },
    data: function(){
        return {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
        }
    },
    watch:{
        value(val, oldVal){
            this.firstName = val.firstName || "";
            this.lastName = val.lastName || "";
            this.email = val.email || "";
            this.gender = val.gender || "";
        },
        $v:{
            handler: function (v) { 
                this.$emit('valid', !v.$invalid);
            },
            deep: true
        },
    },
    methods:{
        detectUpdate(formProp){
            const { firstName, lastName, email, gender } = this;
            const updates = { 
                firstName, lastName, email, gender,
            }
            if(!!this.value.id){
                updates.id = this.value.id;
            }
            formProp.$touch();
            this.$emit('input', updates);
        },
        isSuccess(v){
            if(v.$dirty){
                return v.$invalid ? false : null;
            }
            return null;
        },
    },
    validations:{
        firstName: {
            required
        },
        lastName: {
            required
        },
        email:{
            required,
            email
        },
        gender:{
            required
        }
    },
}
</script>

<style>

</style>
