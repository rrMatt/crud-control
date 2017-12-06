<template>
  <section>

    <CrudControl
      itemName="User"
      :data="users"
      :totalRecords="totalUsers"
      :transform="usersTransform"
      :form="userForm"
      :saving="isSubmitting"
      :loading="isLoading"
      @create="createUser"
      @edit="editUser"
      @delete="deleteUser"
      @search="searchUsers"
    >
      <p slot="delete-message" slot-scope="props">
        Are you sure that you wish to delete {{props.item.firstName}} {{props.item.lastName}}
      </p>
      
      <!-- <b-form-input slot="extra-filter"
          type="text"
          placeholder="Other">
      </b-form-input> -->
      <!-- <p slot="pre-table">This is some random content injected before table (put advanced filters here?)</p> -->
    </CrudControl>

  </section>
</template>

<script>
import CrudControl from './CrudControl'
import UserForm from './UserForm'
import { mapState, mapActions } from 'vuex'
import { usersNamespace } from '../store/namespaces'
import { actions } from '../store/usersList'

export default {
  name: 'UsersList',
  data: function(){
    return {
      usersTransform: {
        'Full Name': x => `${x.firstName} ${x.lastName}`,
        email: x => x.email,
        gender: x => x.gender == 'male' ? 'Male' : 'Female'
      },
      userForm: UserForm,
    }
  },
  computed:{
    ...mapState(usersNamespace, {
      users: state => state.list,
      totalUsers: state => state.total,
      isSubmitting: state => state.isSaving,
      isLoading: state => state.isSaving,
    })
  },
  methods: {
    ...mapActions(usersNamespace, {
      createUser: actions.createUser.name,
      editUser: actions.editUser.name,
      deleteUser: actions.deleteUser.name,
      searchUsers: actions.getUsers.name
    }),
  },
  components:{
    CrudControl,
  }
}
</script>

<style lang="scss" scoped>

</style>
