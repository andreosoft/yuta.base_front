import colors from './colors'

export default {

    fullscr: {
      title: 'На полный экран',
      text: '<i class="fas fa-arrows-alt"></i>',
      command: 'fullscr',
      value: ''
    },
    code: {
      title: 'Показать код',
      text: '<i class="fas fa-code"></i>',
      command: 'code',
      value: ''
    },
    center: {
      title: 'По центру',
      text: '<i class="fas fa-align-center"></i>',
      command: 'justifyCenter',
      value: ''
    },
    left: {
      title: 'Слева',
      text: '<i class="fas fa-align-left"></i>',
      command: 'justifyLeft',
      value: ''
    },
    right: {
      title: 'Справа',
      text: '<i class="fas fa-align-right"></i>',
      command: 'justifyRight',
      value: ''
    },
    insertImage: {
      title: 'Вставить изображение',
      text: '<i class="fas fa-image"></i>',
      command: 'insertImage',
      value: ''
    },
    createlink: {
      title: 'Вставить ссылку',
      text: '<i class="fas fa-link"></i>',
      command: 'createlink',
      value: ''
    },
    unlink: {
      title: 'Убрать ссылку',
      text: '<i class="fas fa-unlink"></i>',
      command: 'unlink',
      value: ''
    },
    formats: {
      title: 'Форматирование',
      text: '<i class="fas fa-pen"></i>',
      command: 'submenu',
      type: 'none',
      show: false,
      value: [
        {
          title: 'h1',
          text: 'h1',
          command: 'formatBlock',
          value: 'h1'
        },
        {
          title: 'h2',
          text: 'h2',
          command: 'formatBlock',
          value: 'h2'
        },
        {
          title: 'h3',
          text: 'h3',
          command: 'formatBlock',
          value: 'h3'
        },
        {
          title: 'p',
          text: 'p',
          command: 'formatBlock',
          value: 'p'
        },
      ]
    },
    backColor: {
      title: 'Цвет фона',
      text: '<i class="fas fa-edit"></i>',
      command: 'submenu',
      type: 'color',
      show: false,
      value: colors.back
    },
    foreColor: {
      title: 'Цвет текста',
      text: '<i class="fas fa-highlighter"></i>',
      command: 'submenu',
      type: 'color',
      show: false,
      value: colors.fore
    },
    fontName: {
      title: 'Тип шрифта',
      text: '<i class="fas fa-font"></i>',
      command: 'submenu',
      type: 'fontname',
      show: false,
      value: [
        {
          text: 'arial',
          command: 'fontName',
          value: 'arial'
        },
        {
          text: 'sans-serif',
          command: 'fontName',
          value: 'sans-serif'
        },
        {
          text: 'serif',
          command: 'fontName',
          value: 'serif'
        },
        {
          text: 'monospace',
          command: 'fontName',
          value: 'monospace'
        },
        {
          text: 'cursive',
          command: 'fontName',
          value: 'cursive'
        },
      ]
    },
    fontSize: {
      title: 'Размер шрифта',
      text: '<i class="fas fa-text-height"></i>',
      command: 'submenu',
      type: 'none',
      show: false,
      value: [
        {
          text: '1',
          command: 'fontSize',
          value: '1'
        },
        {
          text: '2',
          command: 'fontSize',
          value: '2'
        },
        {
          text: '3',
          command: 'fontSize',
          value: '3'
        },
        {
          text: '4',
          command: 'fontSize',
          value: '4'
        },
        {
          text: '5',
          command: 'fontSize',
          value: '5'
        },
        {
          text: '6',
          command: 'fontSize',
          value: '6'
        },
        {
          text: '7',
          command: 'fontSize',
          value: '7'
        }
      ]
    },
    indent: {
      title: 'Добавляет отступ в строку в которой расположен курсор',
      text: '<i class="fas fa-indent"></i>',
      command: 'indent',
      value: ''
    },
    outdent: {
      title: 'Отступ',
      text: '<i class="fas fa-outdent"></i>',
      command: 'outdent',
      value: ''
    },
    redo: {
      title: 'Повтор последнего действия',
      text: '<i class="fas fa-redo"></i>',
      command: 'redo',
      value: ''
    },
    undo: {
      title: 'Отмена последнего действия',
      text: '<i class="fas fa-undo"></i>',
      command: 'undo',
      value: ''
    },
    bold: {
      title: 'Выделение жирным',
      text: '<i class="fas fa-bold"></i>',
      command: 'bold',
      value: ''
    },
    italic: {
      title: 'Переключает курсив в месте курсора или выделения',
      text: '<i class="fas fa-italic"></i>',
      command: 'italic',
      value: ''
    },
    underline: {
      title: 'Переключает подчёркивание для выбранного или на месте курсора',
      text: '<i class="fas fa-underline"></i>',
      command: 'underline',
      value: ''
    },
    subscript: {
      title: 'Переключает нижний индекс для выбранного или на месте курсора',
      text: '<i class="fas fa-subscript"></i>',
      command: 'subscript',
      value: ''
    },
    superscript: {
      title: 'Переключает верхний индекс для выбранного или на месте курсора',
      text: '<i class="fas fa-superscript"></i>',
      command: 'superscript',
      value: ''
    },
    strikeThrough: {
      title: 'Переключает зачеркивание текста для выделенния или на месте курсора',
      text: '<i class="fas fa-strikethrough"></i>',
      command: 'strikeThrough',
      value: ''
    },
    insertOrderedList: {
      title: 'Создает пронумерованный список из выбранного или на месте курсора',
      text: '<i class="fas fa-list-ol"></i>',
      command: 'insertOrderedList',
      value: ''
    },
    insertUnorderedList: {
      title: 'Создает список из выбранного или на месте курсора',
      text: '<i class="fas fa-list-ul"></i>',
      command: 'insertUnorderedList',
      value: ''
    },
    insertHorizontalRule: {
      title: 'Вставляет горизонтальную линию',
      text: '<i class="fas fa-ruler-horizontal"></i>',
      command: 'insertHorizontalRule',
      value: ''
    },
    cut: {
      title: 'Вырезает выделенное и помещает его в буфер обмена',
      text: '<i class="fas fa-cut"></i>',
      command: 'cut',
      value: ''
    },
    paste: {
      title: 'Вставляет данные из буфера обмена в место курсора',
      text: '<i class="fas fa-paste"></i>',
      command: 'Paste',
      value: ''
    },
    copy: {
      title: 'Копирует выделенное в буфер обмена',
      text: '<i class="fas fa-copy"></i>',
      command: 'copy',
      value: ''
    },
    delete: {
      title: 'Удаляет выделенное',
      text: '<i class="fas fa-trash"></i>',
      command: 'delete',
      value: ''
    },
    removeFormat: {
      title: 'Очищает форматирование для выделенного',
      text: '<i class="fas fa-eraser"></i>',
      command: 'removeFormat',
      value: ''
    },
    selectAll: {
      title: 'Ctrl+A. Выделяет всё в редактируемом документе',
      text: '<i class="fas fa-check-double"></i>',
      command: 'selectAll',
      value: ''
    },

}
