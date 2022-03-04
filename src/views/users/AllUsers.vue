<template>
  <v-card >
      <v-card-title>
          <v-container class="box m-3" fluid>
                <v-row>
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="2"
                >
                    <v-select
                    :items="desserts"
                    label="Solo field"
                    solo
                    ></v-select>
                </v-col>

                  <v-col
                    class="d-flex"
                    cols="12"
                    sm="4"
                >
                    <v-text-field
                    v-model="search"
                    solo
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                </v-col>

                    <v-col
                    class="d-flex flex-row-reverse offset-3"
                    cols="12"
                    sm="2"
                >
                         <v-btn
                        tile
                        color="#6D5BD0"
                        style="color: white; font-weight: bold"
                        >
                        PAY DUES
                        </v-btn>
                </v-col>
            </v-row>
  <v-simple-table>
    <template v-slot:default>
      <thead color="#F4F2FF" style="background: #F4F2FF">
        <tr>
            <th class="text-left">
          </th>
            <th class="text-left">
          </th>
          <th class="text-left">
            NAME
          </th>
          <th class="text-left">
            USER STATUS
          </th>
          <th class="text-left">
            PAYMENT STATUS
          </th>
          <th class="text-left">
            AMOUNT
          </th>
          <th class="text-left">
              <i class="fas fa-ellipsis-v" style="left: 40px"></i>
          </th>
        </tr>
      </thead>
      <tbody v-for="item in desserts"
          :key="item.id">
        <tr>
        
          <td>
                <v-checkbox
                @click="showDetails(item.id)"
                v-model="$data[checkbox.id === item.id ? true : checkbox.status]">
                </v-checkbox>
            </td>
          <td @click="showTable(item.id, item.activities)">
            <i class="fa fa-angle-down"  style="cursor: pointer"></i>
          </td>  

          <td>

            <div>
                <span style="color: #25213B; font-weight: bolder">{{ item.firstName }} {{ item.lastName }}</span>
                <br />
                <span style="color: #6E6893">{{ item.email }}</span>
          </div>
          </td>
          <td>
        
          <div>
            <span  style="font-weight: bolder; background: #E6E6F2; padding: 3px; border-radius: 10px; text-transform: capitalize" :class="(item.userStatus === 'active') ? 'is-primary' : 'is-outlined'">
                <i class="fas fa-circle" style="font-size: 10px"></i> {{ item.userStatus }}</span>
            <br />
            <span style="color: #6E6893">Last login: {{ item.lastLogin }}</span>
          </div>
          </td>
          <td>
               <span  style="font-weight: bolder; padding: 3px; border-radius: 10px; text-transform: capitalize" :class="(item.paymentStatus === 'paid') ? 'paid' : (item.paymentStatus === 'unpaid') ? 'unpaid' : 'overdue'">
                 {{ item.paymentStatus }}</span>
            <br />
            <span v-if="item.paymentStatus === 'paid'" style="color: #6E6893">
                Paid on {{ item.paidOn }}
            </span>
            <span v-else style="color: #6E6893">
                N/A
            </span>
          </td>
          <td><span style="color: #25213B; font-weight: bolder">{{ (item.amountInCents).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            }) }}
              </span><br/>
              <span style="color: #6E6893">USD</span>
            </td>
          <td> <span class="mr-5" style="cursor: pointer">view status</span>
               <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon
                    v-bind="attrs"
                    v-on="on"
                    >
                    <i class="fas fa-ellipsis-v ml-3" style="cursor: pointer"></i>
                    </v-btn>
                </template>
                <v-list>
                    <!-- <v-list-item
                    v-for="(list, index) in cruds"
                    :key="index"
                    > -->
                    <v-list-item-title style="cursor: pointer; padding: 10px">{{cruds.title1}}</v-list-item-title>
                    <v-list-item-title style="cursor: pointer; padding: 10px">{{cruds.title2}}</v-list-item-title>
                    <v-list-item-title style="cursor: pointer; padding: 10px; color: green" @click="userActivate(item.userStatus, item.id)">{{item.userStatus === 'inactive' ? cruds.title3 : 'Deactivate User'}}</v-list-item-title>
                    <v-list-item-title style="cursor: pointer; padding: 10px; color: red">{{cruds.title4}}</v-list-item-title>
                    <!-- <v-list-item-title v-if="list.title === 'View Profile'" style="cursor: pointer">{{list.title}}</v-list-item-title>
                    <v-list-item-title  style="cursor: pointer; color: green">{{ item.userStatus === 'inactive' ? 'Activate User' : 'Deactivate User' }}</v-list-item-title>
                    <v-list-item-title v-if="list.title === 'Delete'" style="cursor: pointer; color: red">{{ list.title }}</v-list-item-title> -->
                    <!-- </v-list-item> -->
                </v-list>
              </v-menu>
        </td>
        
        </tr>

            <tr v-show="details.id === item.id ? true : false">
      <td colspan="7">

          <v-simple-table style="background: #F4F2FF">
                <template v-slot:default>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    <th class="text-left">
                        DATE
                    </th>
                    <th class="text-left">
                        USER ACTIVITY
                    </th>
                     <th class="text-left">
                        DETAIL <i class="fas fa-info-circle"></i>
                    </th>
                    </tr>
                </thead>
                <tbody>
                       <tr v-for="(activity, index) in activities" :key="index">
                  <td></td>
                  <td></td>
                <td>{{ activity.date }}</td>
                <td>{{ activity.userActivity }}</td>
                <td>{{ activity.details }}</td>
              </tr>
                </tbody>
                </template>
            </v-simple-table>         
        <!-- </div> -->
      </td>
      
    </tr>
        
      </tbody>
    </template>
  </v-simple-table>
  </v-container>

    </v-card-title>

    
  </v-card>
</template>

<script>
import api from '@/services/api'
  export default {
    data: () => ({
      dialog: false,
      search: "",
      dialogDelete: false,
      checkbox: {status: false, id: null},
      details: {status: false, id: null},
      desserts: [],
      editedIndex: -1,
      activities: [],
      cruds: {
        title1: 'Edit',
        title2: 'View Profile',
        title3: 'Activate User',
        title4: 'Delete'
      },
      activateId: null,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    methods: {
      initialize () {
          api.get("users/anJV1pzv98954kD").
          then((response) => {

              console.log(response)
            this.desserts = response.data.data
          }).
          catch((err) => err.error)
      },

      showDetails (id) {
          this.checkbox.id = id
         this.checkbox.status = true
      },

      showTable (id, user) {
         this.activities = user;
         this.details.id = id
         this.details.status = true
         if (this.details.status === true) {
             this.details.status = false
         } else {
             this.details.status = true

         }
      },

      userActivate(userStatus, userId) {
        this.activateId = userId
        if (userStatus === "inactive") {
           api.patch(`activate-user/${userId}`)
          .then((response) => {
            if (response.data.status) {
              this.cruds.title3 = "Deativate User"
            }
          })
          .catch((err) => console.log(err))
        } else {
          api.patch(`deactivate-user/${userId}`)
          .then((response) => {
             if (response.data.status) {
              this.cruds.title3 = "Activate User"
            }
          })
          .catch((err) => console.log(err))
        }
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
    mounted () {
      this.initialize()
      console.log(this.desserts);
    },
  }
</script>

<style scoped>
 .box {
box-shadow: 0px -1px 12px 5px rgba(0,0,0,0.25);
-webkit-box-shadow: 0px -1px 12px 5px rgba(0,0,0,0.25);
-moz-box-shadow: 0px -1px 12px 5px rgba(0,0,0,0.25);
  border-radius: 20px;
 
}

.is-primary {
   color: #4A4AFF;
}

.is-outlined {
    color: #6E6893;
}
.paid{
   color: #007F00;
   background: #CDFFCD;
}
.overdue{
   color: #D30000;
   background: #FFE0E0;

}
.unpaid{
    color: #965E00;
   background: #FFECCC;

}
</style>