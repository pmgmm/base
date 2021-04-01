.. index:: Option Button

.. _optionbutton:

Option Button
=============

Este componente permuta entre várias opções.

.. image:: ../resources/optionbutton.png

Requisitos
---------- 
         
========================================= ===============
``/framework/components/optionbutton.js``
``/framework/components/shared.js``       :ref:`jsshared`     
========================================= ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-optionbutton>
        <span slot="information">texto</span>
        <span slot="options">[{},{},...]</span>
    </fwk-optionbutton>

==================== ====================================== =========== =============== =======
Atributo             Descrição                              Obrigatório Opções          Default
==================== ====================================== =========== =============== =======
``id``               Identificador único do componente      Sim (?)        
``key-value``        Key identificativa do valor das opções Sim         
``key-text``         Key identificativa do texto das opções Sim         
``value``            Opção inicial                          Sim        
``disable``          Inibe componente                       Não         "true", "false" "false" 
``hide``             Esconde componente                     Não         "true", "false" "false" 
``color``            Cor base do componente                 Não         "blue", "gray"  "gray" 
``tooltip-position`` Posição do tooltip                     Não         "left", "right" "right"
``function``         Função a executar no evento onchange   Não     
==================== ====================================== =========== =============== =======

.. important:: O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

=============== ====================== =========== ================================
Slot            Descrição              Obrigatório Observações
=============== ====================== =========== ================================
``information`` Tooltip de informação  Não         Admite html
``options``     Opções para componente Sim         :ref:`optionbutton_options_slot`
=============== ====================== =========== ================================

----

Função de componente
--------------------

| O atributo ``function`` destina-se a definir a chamada a uma função global ou a um método de classe.
| A função recebe, como parâmetros, o valor da nova opção e o valor da opção anterior ``(new, old)``.
| Os formatos permitidos são:

======================= ==========================                                        
Função global (formato) Método de classe (formato)                             
======================= ==========================
function = "onchange"   function = "obj.onchange"                  
======================= ==========================

----

.. _optionbutton_options_slot:

Slot options
------------

A slot ``options`` é um array de objectos. Cada objecto corresponde a uma opção do componente e tem o seguinte formato:

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

    <fwk-optionbutton id="purchase_interest" key-value="value" key-text="text" value="n" function="onchange">
        <span slot="information">texto</span> 
        <div slot="options">[{"value": "y", "text":"Sim"}, {"value": "n", "text":"Não"}, {"value": "m", "text":"Talvez"}]</div>
    </fwk-optionbutton>

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_optionbutton = FormHelper.getComponent('fwk_optionbutton');

Seleccionar / cancelar opção 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_optionbutton.value = '?';
    obj_optionbutton.value = '';

Ler valor
^^^^^^^^^
.. code:: Javascript

    let value = obj_optionbutton.value;

Ler selecção (texto) 
^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    let text = obj_optionbutton.selection;

Ler atributos extra
^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    let data = obj_optionbutton.data;

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_optionbutton.hide = false;
    obj_optionbutton.hide = true;

Habilitar / inibir
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_optionbutton.disable = false;
    obj_optionbutton.disable = true;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_optionbutton.hide;
    let is_disable = obj_optionbutton.disable;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.