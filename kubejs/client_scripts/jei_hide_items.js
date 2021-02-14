//priority 0

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
    'uranium',
    'constantan',
    'electrum',
    'steel'
]

// List of gems to be unified with Silent Gems versions
var REDUNDANT_GEMS = [
    'amethyst',
    'sapphire'
]

// List of metals that are added by Emendatus Enigmatica,
// but are not used for any recipes in the modpack
var UNUSED_METALS = [
    'osmium',
    'bronze',
    'invar',
    'signalum',
    'lumium',
    'enderium'
]

// List of gems added by EE that are not used in this pack
// These are separated from metals because gems don't add types like
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

onEvent('jei.hide.items', event => {
    // Hide all items from Survival Plus, as it is only included as a dependency for lightsabers
    event.hide('@survivalplus')

    // Remove redundant items that appear in both Absent by Design and Sweet Concrete/Lotta Terracotta
    event.hide(/absentbydesign:.+concrete.+/)
    event.hide(/absentbydesign:.+terracotta.+/)

    // Hide unused materials from Emendatus Enigmatica
    UNUSED_METALS.forEach(material => {
        METAL_TYPES.forEach(type => {
            var item = 'emendatusenigmatica:' + material + '_' + type
            if(!item.of(item).isEmpty()){
                event.hide(item)
            }
        });
    });

    UNUSED_GEMS.forEach(material => {
        GEM_TYPES.forEach(type => {
            var item = 'emendatusenigmatica:' + material + '_' + type
            if(!item.of(item).isEmpty()){
                event.hide(item)
            }
        });
    });


    // Unify redundant materials covered by Emendatus Enigmatica
    REDUNDANT_METALS.forEach(material => {
        METAL_TYPES.forEach(type => {
            var item = material + '_' + type
            if(!item.of(item).isEmpty()){
                event.hide(item)
            }
        });
    });

    REDUNDANT_IE_METALS.forEach(material => {
        METAL_TYPES.forEach(type => {
            var item = 'immersiveengineering:' + type + '_' + material
            if(!item.of(item).isEmpty()){
                event.hide(item)
            }
        });
    });

    REDUNDANT_GEMS.forEach(material => {
        GEM_TYPES.forEach(type => {
            var item = material + '_' + type
            if(!item.of(item).isEmpty()){
                event.hide(item)
            }
        });
    });

    // Unify plates and sheets from IE and Create with Emendatus Enigmatica
    event.hide(/immersiveengineering:plate.+/)
    event.hide(/create:.+_sheet/)

    // Unify rods
    event.hide(/emendatusenigmatica:.+_rod/)
    event.hide('silentgear:iron_rod')

    // None of our mods use gears, get 'em outta heeeeere
    event.hide(/emendatusenigmatica:.+_gear/)

    // Hide variant ores from Emendatus Enigmatica
    // because why would anyone need to see them in JEI
    event.hide(/emendatusenigmatica:.+_.+_ore/)
})