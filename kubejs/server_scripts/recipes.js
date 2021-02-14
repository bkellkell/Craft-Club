// priority: 0

settings.logAddedRecipes = false
settings.logRemovedRecipes = false
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

// List of Metals to be unified with Emendatus Enigmatica versions
var REDUNDANT_METALS = [
  'create:copper',
  'create:zinc',
  'create:brass',
  'eidolon:lead',
  'iceandfire:copper',
  'iceandfire:silver',
  'silentgems:silver'
]

// Immersive Engineering ids are formatted differently to most other mods
// The type comes before the material (i.e. ingot_iron vs iron_ingot)
// As such, they need different logic for iterating through the list
var REDUNDANT_IE_METALS = [
  'aluminum',
  'copper',
  'lead',
  'nickel',
  'silver',
  'uranium'
]

// List of gems to be unified with Silent Gems versions
var REDUNDANT_GEMS = [
  'amethyst',
  'sapphire'
]

// List of metals that are added by Emendatus Enigmatica,
// but are not used for any recipes in the modpack
var UNUSED_METALS = [
  'tin',
  'osmium',
  'bronze',
  'invar',
  'signalum',
  'lumium',
  'enderium'
]

// List of gems added by EE that are not used in this pack
// These are separated because gems don't add types like
// ingots, nuggets, plates, etc.
var UNUSED_GEMS = [
  'certus_quartz',
  'charged_certus_quartz',
  'fluorite',
  'bitumen',
  'apatite',
  'sulfur',
  'potassium_nitrate',
  'silicon',
  'cinnabar',
  'fluix',
  'arcane',
  'dimensional',
  'coke'
]

// List of non-vanilla metals to unify with Emendatus Enigmatica
var USED_METALS = [
  'aluminum',
  'brass',
  'constantan',
  'copper',
  'electrum',
  'lead',
  'nickel',
  'silver',
  'steel',
  'uranium',
  'zinc'
]

var METAL_TYPES = [
  'ore',
  'ingot',
  'nugget',
  'dust',
  'chunk',
  'block',
  'storage_block',
  'rod',
  'plate'
]

var GEM_TYPES = [
  'ore',
  'gem',
  'dust',
  'chunk',
  'block'
]

onEvent('recipes', event => {
  // The only recipes in this pack that use titanium or bronze are for lightsabers
  // To avoid adding more ores to worldgen *just* for lightsabers
  // We change the recipes to use aluminum and brass, which are already used by other mods
  event.replaceInput({}, '#forge:ingots/titanium', '#forge:ingots/aluminum')
  event.replaceInput({}, '#forge:ingots/bronze', '#forge:ingots/brass')

  // Remove all recipes from Survival Plus, as it is only included as a dependency for lightsabers
  event.remove({ mod: 'survivalplus' })

  // Remove redundant items that appear in both Absent by Design and Sweet Concrete/Lotta Terracotta
  event.remove({ output: /absentbydesign:.+concrete.+/ })
  event.remove({ output: /absentbydesign:.+terracotta.+/ })

  // Replace metal recipes with Emendatus Enigmatica versions where possible
  USED_METALS.forEach(material => {
    METAL_TYPES.forEach(type => {
      var newItem = 'emendatusenigmatica:' + material + '_' + type
      var oldItem = '#forge:' + type + 's/' + material
      if(!item.of(newItem).isEmpty()){
        event.replaceOutput({}, oldItem, newItem)
      }
    });
  });

  // Replace redundant gems with Silent Gems versions
  REDUNDANT_GEMS.forEach(material => {
    GEM_TYPES.forEach(type => {
      var newItem = 'silentgems:' + material + '_' + type
      var oldItem = 'iceandfire:' + material + '_' + type
      if(!item.of(newItem).isEmpty()){
        event.replaceOutput({}, oldItem, newItem)
      }
    });
  });

  // Remove recipes for unused metals
  UNUSED_METALS.forEach(material => {
    METAL_TYPES.forEach(type => {
      var item = '#forge:' + type + 's/' + material
      if(!item.of(item).isEmpty()){
        event.remove({ output: item })
      }
    });
  });

  // Remove recipes for unused gems
  UNUSED_GEMS.forEach(material => {
    GEM_TYPES.forEach(type => {
      var item = '#forge:' + type + 's/' + material
      if(!item.of(item).isEmpty()){
        event.remove({ output: item })
      }
    });
  });

  // Unify plates and sheets from IE and Create with Emendatus Enigmatica
  event.remove({ output: /immersiveengineering:plate.+/ })
  event.remove({ output: /create:.+_sheet/ })

  // Unify rods
  event.remove({ output: /emendatusenigmatica:.+_rod/ })
  event.remove({ output: 'silentgear:iron_rod' })

  // None of our mods use gears, get 'em outta heeeeere
  event.remove({ output: /emendatusenigmatica:.+_gear/ })
})