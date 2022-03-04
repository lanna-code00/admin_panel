<template>
  <v-card >
         <v-progress-linear v-show="loading"
      indeterminate
      color="#6D5BD0"
    ></v-progress-linear>
      <v-card-title>
          <v-container class="box m-3" fluid>
              <!-- <div class="float-right">
                  <v-btn  style="background: none; border: none; box-shadow: none; color: #6D5BD0; font-weight: bolder; font-size: 20px; right: 30px">
                  $9000.00
                  </v-btn>
              </div> -->

               <div class="text-right">
                  <v-chip
                    class="mr-5 mb-4"
                     style="background: none; border: none; box-shadow: none; color: #6D5BD0; font-weight: bolder; font-size: 20px; right: 30px"
                  >
                    {{ (totalPayment).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            }) }}
                  </v-chip>

                </div>
                <!-- <v-row class="float-right">
                </v-row>   -->
                <v-row>
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="2"
                >
                  <div class="text-center">
                        <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            v-bind="attrs"
                            v-on="on"
                            style="box-shadow: none; border: 1px solid #8B83BA; background: none"
                            >
                            <i class="fas fa-filter mr-3" style="color: #8B83BA"></i> Filter
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                            v-for="(item, index) in sorts"
                            :key="index"
                            >
                            <v-list-item-title style="cursor: pointer" @click="sortTable(item)">{{ item }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                        </v-menu>
                    </div>
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
                        @click="markPayments(marks.id, marks.status)"
                        >
                        PAY DUES
                     <v-progress-circular
                            indeterminate
                            color="white"
                            class="ml-3"
                            size=20
                            v-show="loading_pay"
                          ></v-progress-circular>
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
             ACTIONS <i class="fas fa-ellipsis-v" style="left: 40px"></i>
          </th>
        </tr>
      </thead>
      <tbody v-for="item in filteredList"
          :key="item.id">
        <tr>
        
          <td>
                <v-checkbox
                @click="showDetails(item.id, item.paymentStatus)"
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
                    <v-list-item-title style="cursor: pointer; padding: 10px; color: red" @click="callDeleteModal(item.id, item.firstName, item.lastName)">{{cruds.title4}}</v-list-item-title>
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

  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="">{{ details.userText }}</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            CANCEL
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteUser(details.id, details.firstName, details.lastName)"
          >
            DELETE   <v-progress-circular
                            indeterminate
                            color="white"
                            class="ml-3"
                            size=20
                            v-show="delete_success"
                          ></v-progress-circular>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

    </v-card-title>

    
  </v-card>
</template>

<script>
import api from '@/services/api'
  export default {
    data: () => ({
      dialog: false,
      search: "",
      delete_success: false,
      dialogDelete: false,
      checkbox: {status: false, id: null},
      details: {status: false, id: null, userText: '', firstName: '', lastName: ''},
      desserts: [],
      marks: {id: null, status: ''},
      activities: [],
      loading: true,
      loading_pay: false,
      cruds: {
        title1: 'Edit',
        title2: 'View Profile',
        title3: 'Activate User',
        title4: 'Delete'
      },
      sorts : ['First Name', 'Last Name', 'E-mail'],
      activateId: null,
    }),

    computed: {
      filteredList() {
      return this.desserts.filter(post => {
        return post.firstName.toLowerCase().includes(this.search.toLowerCase()) || post.lastName.toLowerCase().includes(this.search.toLowerCase()) || post.email.toLowerCase().includes(this.search.toLowerCase());
       })
      },

      totalPayment() {
        return this.desserts.reduce(
        (previousValue, currentValue) => previousValue + currentValue.amountInCents,
        0
      )
      }
    },

    methods: {
      initialize () {
          api.get("users/anJV1pzv98954kD").
          then((response) => {
            this.desserts = response.data.data
            if (response.data.status === true) {
              this.loading = false
            } else {
              this.loading = true
            }
          }).
          catch((err) => err.error)
      },

      sortTable(name){
          if (name === 'First Name') {
              this.desserts.sort(function(a, b) {
                let nameA = a.firstName.toUpperCase();
                let nameB = b.firstName.toUpperCase(); 
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
                });
          }
           if (name === 'Last Name') {
              this.desserts.sort(function(a, b) {
                let nameA = a.lastName.toUpperCase();
                let nameB = b.lastName.toUpperCase(); 
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
                });
          }
           if (name === 'E-mail') {
                this.desserts.sort(function(a, b) {
                let nameA = a.email.toUpperCase();
                let nameB = b.email.toUpperCase(); 
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
                });
          }
      },

      showDetails (id, status) {
          this.checkbox.id = id
         this.checkbox.status = true
         this.marks.id = id
         this.marks.status = status
      },

      markPayments(userId, status){
        this.loading_pay = true
         if (status === "unpaid") {
           api.patch(`mark-paid/${userId}`)
          .then((response) => {
            if (response.data.status === true) {
              this.cruds.title3 = "Deativate User"
              this.loading_pay = false
            }
          })
          .catch((err) => console.log(err))
        } else {
          api.patch(`mark-unpaid/${userId}`)
          .then((response) => {
             if (response.data.status ) {
              this.cruds.title3 = "Activate User"
              this.loading_pay = false

            }
          })
          .catch((err) => console.log(err))
        }
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

      callDeleteModal(userId, firstName, lastName){
         this.details.id = userId
         this.dialog = true
         this.details.firstName = firstName
         this.details.lastName = lastName
        this.details.userText = `Are you sure you want to delete this user "${firstName} ${lastName}"`
      },

      deleteUser(id, firstName, lastName){
        this.delete_success = true
         api.delete(`remove-user/${id}`)
          .then((response) => {
            if (response.data.status) {
              this.dialog = false
        this.delete_success = false

            }
          })
          .catch((err) => {
        this.delete_success = false

          })
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