.. index:: Drag & drop select

.. _dragdropselect:

Drag & Drop Select
==================

Este componente selecciona opções por arrasto.

.. image:: ../resources/dragdropselect.png

Requisitos
----------
       
=========================================== ===============
``/framework/components/dragdropselect.js``                       
``/framework/components/shared.js``         :ref:`jsshared`     
=========================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-dragdropselect>
        <span slot="information">texto</span>
        <div slot="template_details">
            component
            component
            ...
        </div>
        <div slot="details">{}</div>
        <div slot="options">[{},{},...]</div>
    </fwk-dragdropselect>

==================== ====================================== =========== =============== =======
Atributo             Descrição                              Obrigatório Opções          Default
==================== ====================================== =========== =============== =======
``id``               Identificador único do componente      Sim (?)         
``key-value``        Key identificativa do valor das opções Sim         
``key-text``         Key identificativa do texto das opções Sim    
``value``            Opções iniciais seleccionadas          Não                         "[]"
``title-available``  Título da coluna de disponíveis        Sim
``title-selected``   Título da coluna de seleccionadas      Sim
``width-available``  Largura da coluna de disponíveis       Não                         "200"
``width-available``  Largura da coluna de seleccionadas     Não                         "200"
``filter``           Com filtro                             Não         "true", "false" "false"
``rows``             Linhas visíveis                        Não         "1","2", ...    content
``mandatory``        Selecção obrigatória                   Não         "true", "false" "false"
``disable``          Inibe componente                       Não         "true", "false" "false" 
``hide``             Esconde componente                     Não         "true", "false" "false" 
``color``            Cor base do componente                 Não         "blue", "gray"  "gray" 
``tooltip-position`` Posição do tooltip                     Não         "left", "right" "right"
==================== ====================================== =========== =============== =======

.. important:: O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

==================== ======================= =========== ==================================
Slot                 Descrição               Obrigatório Observações
==================== ======================= =========== ==================================
``information``      Tooltip de informação   Não         Admite html
``template_details`` Componentes de detalhe  Não        
``details``          Detalhes de opções      Não         :ref:`dragdropselect_details_slot`
``options``          Opções para componente  Sim         :ref:`dragdropselect_options_slot`
==================== ======================= =========== ==================================

.. attention:: A ordem das slots no componente é, obrigatóriamente, a seguinte:

    #. ``template_details``
    #. ``details`` 
    #. ``options``

.. _dragdropselect_details_slot:

Slot details
------------

| A slot ``details`` é um objecto. Se o componente tem detalhes configurados, cada uma das opções tem a configuração de detalhe definida neste objecto.
| Cada opção tem uma propriedade cujo nome é a sua ``key`` e o valor a sua configuração.

.. code:: Javascript

    {???:false}

    {???:true}

    {???:[???, ...]}

.. tip::

    Para uma opção identificada com o id = 1:

    * Sem detalhe: {"1":false};
    * Com detalhe (sem valores): {"1":true};
    * Com detalhe (com valores): {"1":[false,"x1",33]}:

        * false para um componente :ref:`checkbox`;
        * "x1" para um componente :ref:`radiobutton`;
        * "33" para um componente :ref:`select`.

.. _dragdropselect_options_slot:

Slot options
------------

 slot **options** é um array de objectos. Cada objecto corresponde a uma opção do componente e tem o seguinte formato:

.. code:: Javascript

    {"value": "???", "text": "???"}

=========== ================= ===========
Atributo    Descrição         Obrigatório
=========== ================= ===========
``value``   Valor para opção  Sim   
``text``    Texto da opção    Sim 
=========== ================= ===========

.. important:: 

    O nome dos atributos pode ser alterado desde que seja mantida a integridade com os valores de ``key-value`` e ``key-text``.

    | O componente disponibiliza uma funcionalidade para devolver o conjunto extra de atributos que sejam acrescentados a cada uma das opções:
    | exemplo: {"value": "???", "text": "???", **"attr1": true, "attr2": ["val1", "val2"], "attr3": {"at1": ?, "at2": "?"}**} 

----

Exemplos
--------

Carregamento html
^^^^^^^^^^^^^^^^^
.. code:: html

    <fwk-dragdropselect id="role_permissions" key-value="id" key-text="code" value='["1",2,"201","203","205"]' 
            width-available="200" width-selected="350" 
            title-available = "DISPONÍVEIS" title-selected = "SELECIONADOS"
            filter="true" rows="12" mandatory="true">
            
        <span slot="information">texto</span> 

        <div slot="template_details">
            <fwk-checkbox id="1" label="C" value="false"></fwk-checkbox>
            <fwk-checkbox id="2" label="R" value="false"></fwk-checkbox>
            <fwk-checkbox id="4" label="U" value="false"></fwk-checkbox>
            <fwk-checkbox id="8" label="D" value="false"></fwk-checkbox> 
        </div>




        <div slot="details">{"1":false,"205":true,"202":[true,true,true,false],"2":false,"101":false,"102":false,
                             "101":false,"103":false,"204":true,"203":true,"3":false,"201":[true,true,true,true]}
        </div>
        <div slot="options">[{"id":"1","code":"ADMINISTRATION"},{"id":"205","code":"APP_PWA"},
                             {"id":"202","code":"GROUP"},{"id":"2","code":"MAINTENANCE"},
                             {"id":"101","code":"MODULE_ADMINISTRATION"},{"id":"102","code":"MODULE_MAINTENANCE"},
                             {"id":"101","code":"MODULE_ORGANIZATION"},{"id":"103","code":"MODULE_SUPPORT"},
                             {"id":"204","code":"PERMISSION"},{"id":"203","code":"ROLE"},{"id":"3","code":"SUPPORT"},
                             {"id":"201","code":"USER"}]
        </div>




    </fwk-dragdropselect>

Carregamento Javascript
^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    var obj_dragdropselect = FormHelper.getComponent('role_permissions');

    var options = [{"id":"1","code":"ADMINISTRATION"},{"id":"205","code":"APP_PWA"},
                             {"id":"202","code":"GROUP"},{"id":"2","code":"MAINTENANCE"},
                             {"id":"101","code":"MODULE_ADMINISTRATION"},{"id":"102","code":"MODULE_MAINTENANCE"},
                             {"id":"101","code":"MODULE_ORGANIZATION"},{"id":"103","code":"MODULE_SUPPORT"},
                             {"id":"204","code":"PERMISSION"},{"id":"203","code":"ROLE"},{"id":"3","code":"SUPPORT"},
                             {"id":"201","code":"USER"}];
   
    var details = {"1":false,"205":true,"202":[true,true,true,false],"2":false,"101":false,"102":false,
                   "101":false,"103":false,"204":true,"203":true,"3":false,"201":[true,true,true,true]};
    
    obj_dragdropselect.fill({
        options: options,
        details: details,
        value: ["1","2", 201,"203","205"]
    });

Carregamento Ajax
^^^^^^^^^^^^^^^^^
.. code:: Javascript

    var obj_ajax_helper = new AjaxHelper(); 
    var obj_reader_helper = new ReaderHelper();
    var obj_dragdropselect = FormHelper.getComponent('role_permissions');
    
    var reader = {ajax: obj_ajax_helper, filter: obj_reader_helper, fully_qualified_class_name: '\\???\\???\\...\\???', action: '???'};
    obj_dragdropselect.fill({
        reader: reader,
        value: ["1","2","201","203",205]
    });


Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_dragdropselect = FormHelper.getComponent('fwk_dragdropselect');

Seleccionar
^^^^^^^^^^^
.. code:: Javascript

    obj_dragdropselect.select(["?","?", ...]); (sem detalhes)
    obj_dragdropselect.select(["?","?", ...], {"?":["?", ...],"?":["?", ...], ...); (com detalhes)

Desseleccionar
^^^^^^^^^^^^^^
.. code:: Javascript

    obj_dragdropselect.unselect();
    obj_dragdropselect.unselect(["?","?", ...]);

Ler valor
^^^^^^^^^
.. code:: Javascript

    let value = obj_dragdropselect.value; (array)

Ler detalhes
^^^^^^^^^^^^
.. code:: Javascript

    let details = obj_dragdropselect.details; (object)

Ler selecção (texto) 
^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    let selection = obj_dragdropselect.selection; (array)

Ler atributos extra
^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    let data = obj_dragdropselect.data; (object)

Atribuir / cancelar obrigatoriedade
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

   obj_dragdropselect.mandatory = true;
   obj_dragdropselect.mandatory = false;

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_dragdropselect.hide = false;
    obj_dragdropselect.hide = true;

Habilitar / inibir
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_dragdropselect.disable = false;
    obj_dragdropselect.disable = true;

Atribuir erro
^^^^^^^^^^^^^
.. code:: Javascript

   obj_dragdropselect.error = true; (apenas sinalizador)
   obj_dragdropselect.error = '???? \n ???';

Cancelar erro
^^^^^^^^^^^^^
.. code:: Javascript

    obj_dragdropselect.error = false;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_dragdropselect.hide;
    let is_disable = obj_dragdropselect.disable;
    let is_mandatory = obj_dragdropselect.mandatory;
    let has_error = obj_dragdropselect.error;

----

Referências
-----------

| :ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.
| :ref:`jsajaxhelper` é uma classe de auxílio aos pediddos Ajax.
| :ref:`jsreaderhelper` é uma classe de auxílio às operações de leitura dos pedidos Ajax.