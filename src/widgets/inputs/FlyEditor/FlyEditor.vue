<template>
  <div>
    <textarea :value="value" style="display:none;"></textarea>
    <div  class="v-text-editor" :class="{'v-text-editor-full': fullscr}">
      <div class="v-text-editor-toolbar">
        <div class="v-text-editor-toolbar-group" v-for="gr in toolbar">
          <div class="v-text-btn-wrapper" v-for="el in gr">
            <template v-if="buttons[el].command=='submenu'">
              <button class="v-text-btn" v-on:click="buttons[el].show ? buttons[el].show = false : buttons[el].show = true" :title="buttons[el].title" v-html="buttons[el].text"></button>
              <div v-if="buttons[el].show" class="v-text-editor-toolbar-submenu" :class="buttons[el].type">
                <div v-for="sub in buttons[el].value">
                  <button class="v-text-btn" v-on:click="buttons[el].show = false;genAction(sub)" :title="sub.title" v-html="sub.text" :style="{background: sub.value }"></button>
                </div>
              </div>
            </template>
            <template v-else>
              <button class="v-text-btn" v-on:click="genAction(buttons[el])" :title="buttons[el].title" v-html="buttons[el].text"></button>
            </template>
          </div>
        </div>
      </div>
      <div :id="id" class="v-text-editor-content" contenteditable v-on:blur="emitChange" v-on:keyup="emitChange" :style="rows && !fullscr? 'height: '+rows*20+'px' : ''"></div>
    </div>
  </div>
</template>

<script>
import buttons from './buttons'

export default {
  props: {
    value: {
      type: String,
      default : ''
    },
    rows: {
      type: Number,
      default : ''
    },
    toolbar: {
      type: Array,
      default: () => [
        ['formats', 'bold' ,'italic', 'underline', 'subscript', 'superscript', 'strikeThrough', 'backColor', 'foreColor', 'fontSize', 'fontName'],
        ['left', 'right', 'center', 'indent', 'outdent'],
        ['insertImage', 'createlink', 'unlink'],
        ['insertOrderedList', 'insertUnorderedList', 'insertHorizontalRule'],
    //    ['undo', 'redo'],
        ['cut', 'copy'],
        ['selectAll', 'removeFormat'],
        ['code', 'fullscr']
      ]
    },
  },
  data: function() {
    return {
      id: null,
      content: null,
      fullscr: false,
      viewcode: false,
      buttons: buttons
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      if (oldVal == '') {
        document.getElementById(this.id).innerHTML = newVal
      }
    }
  },
  methods: {
    emitChange (ev) {
      if (this.viewcode) {
        var val = ev.target.innerText
      } else {
        var val = ev.target.innerHTML
      }
      this.$emit('change-model', val)
      this.$emit('input', val)
    },
    genAction (btn) {
      switch (btn.command) {
        case 'fullscr':
        if (this.fullscr) {
          this.fullscr = false
        } else {
          this.fullscr = true
        }
        break;
        case 'code':
        if (this.viewcode) {
          this.viewcode = false
          document.getElementById(this.id).innerHTML = this.value
        } else {
          this.viewcode = true
          document.getElementById(this.id).innerText = this.value
        }
        break;
        default:
        if (!this.viewcode) {
          if (btn.command == 'createlink' || btn.command == 'insertImage') {
              btn.value = prompt('Enter the link here: ', '');
            }
          document.getElementById(this.id).focus()
          document.execCommand(btn.command, false, btn.value)
          this.$emit('change-model', document.getElementById(this.id).innerHTML)
          this.$emit('input', document.getElementById(this.id).innerHTML)
        }
      }

    }
  },
  components: {
  },
  mounted () {
    this.id = this._uid
  },
  created () {

  },
  destroyed () {

  }
}
</script>

<style lang="less">
.v-text-editor {
  background: #fff;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 3px;
  .v-text-editor-content {
    resize: vertical;
    outline: none;
    min-height: 150px;
    overflow: auto;
    padding: 1em;
    height: calc(100% - 45px);
  }
  .v-text-editor-toolbar {
    border-bottom: 1px solid #eee;
    white-space: nowrap;
    overflow-x: auto;
    height: 45px;
    .v-text-editor-toolbar-group {
      display: inline-block;
      border-right: 1px solid #aaa;
    }
    .v-text-btn {
      outline: none;
      background: none;
      color: #999;
      padding: 10px;
      width: 36px;
      text-align: center;
      font-size: 16px;
      border: none;
      cursor: pointer;
      border-right: 1px solid #efefef;
      &:hover {
        background: #eee;
        color: #555;
      }
    }
  }
}
.v-text-btn-wrapper {
  display: inline-block;
  position: relative;
  .v-text-editor-toolbar-submenu {
    position: absolute;
    background: #fff;
    z-index: 20;
    &.color {
      width: 300px;
      div {
        display: inline-block;
      }
    }
    &.fontname {
      button {
        width: auto;
        text-align: left;
      }
    }
  }
}
.v-text-editor-full {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20000;
}
</style>
