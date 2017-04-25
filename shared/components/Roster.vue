<template>
	<div id="roster" >
		<v-card>
		  <v-card-title>
		    Roster
		    <v-spacer></v-spacer>
		  </v-card-title>
		  <v-data-table
		      v-bind:headers="headers"
		      v-model="$store.state.items"
		      select-all
		      hide-actions
		    >
		    <template slot="items" scope="props">
		      <td>
		        <v-checkbox
		          hide-details
		          primary
		          v-model="props.item.value"
		        ></v-checkbox>
		      </td>
		      <td>
		        <v-edit-dialog
		        	class="edit"
		          @open="props.item._name = props.item.name"
		          @cancel="props.item.name = props.item._name || props.item.name"
		          lazy
		        > {{ props.item.name }}
		          <v-text-field
		            slot="input"
		            label="Edit"
		            :value="props.item.name"
		            @change="val => props.item.name = val"
		            counter="counter"
		          ></v-text-field>
		        </v-edit-dialog>
		      </td>
			      <td class="text-xs-right">
			        <v-switch slot="input" v-model="props.item.pitcher"></v-switch>
			      </td>
			      <td class="text-xs-right" v-if="props.item.pitcher">
				      <v-menu offset-y class="edit">
							  <v-btn primary dark slot="activator">Inning {{props.item.inningPitching}}</v-btn>
							  <v-list>
							    <v-list-item v-for="inning in 6" :key="inning">
							      <v-list-tile>
							        	<v-radio
							        		:label="inning.toString()"
							        		primary light
							        		v-model="props.item.inningPitching"
							        		:value="inning"
							        	/>
							      </v-list-tile>
							    </v-list-item>
							  </v-list>
							</v-menu>
			      </td>
			      <td class="text-xs-right" v-if="!props.item.pitcher">
							  <v-btn white dark>N/A</v-btn>
			      </td>
			      <td class="text-xs-right">
			      <v-menu offset-y class="edit" >
							  <v-btn primary dark slot="activator">Preferred Positions</v-btn>
							  <v-list>
							    <v-list-item v-for="position in positions" :key="position">
					        	<v-checkbox
					        		:label="position"
					        		primary light
					        		v-model="props.item.preferredPositions"
					        		:value="position"
					        	/>
							    </v-list-item>
							  </v-list>
							</v-menu>
						</td>
						<td class="text-xs-right">
			      <v-menu offset-y class="edit">
							  <v-btn primary dark slot="activator">Avoided Positions</v-btn>
							  <v-list>
							    <v-list-item v-for="position in positions" :key="position">
					        	<v-checkbox
					        		:label="position"
					        		primary light
					        		v-model="props.item.positionsToAvoid"
					        		:value="position"
					        	/>
							    </v-list-item>
							  </v-list>
							</v-menu>
						</td>
			      
			      <td>
		      </td>
		    </template>
		  </v-data-table>
		</v-card>
		<v-btn primary @click.native="addPlayer">Add Player</v-btn>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				positions: [
					'Pitcher',
					'Catcher',
					'First Base',
					'Second Base',
					'Third Base',
					'Short Stop',
					'Left Field',
					'Center Field',
					'Right Field'
				],
				headers: [
				 { text: 'Player Name', left: true, value: 'name', filter: true },
				 { text: 'Pitcher', left: true, value: 'pitcher' },
				 { text: 'Inning Pitching', value: 'inningPitching' },
				 { text: 'Preferred Positions', value: 'preferredPositions' },
				 { text: 'Positions to Avoid', value: 'positionsToAvoid' },

				],
			}
		},
		ready() {
			axios.get(`${process.env.DOMAIN}/users/current`)
			.then(res => {
				console.log(res)	
			})
			// this.getItems()
		},
		methods: {
			getItems() {
				axios.get('')
			},
			postItem() {
				
			},
			updatePlayer() {

			},
			addPlayer() {
				let player = {
			  	value: false,
			  	name: '',
			  	pitcher: false,
			  	inningPitching: null,
			   	preferredPositions: [],
			   	positionsToAvoid: [],
			  }
				// axios.post(`${process.env.DOMAIN}/api/users/`)
				// this.items.push(player)
			}
		},
		created() {
		}
	}
</script>

<style>
.edit {
	z-index: 999999999999999 !important;
	overflow: visible !important;
}
</style>