.. index:: Label

.. _label:

Label
=====

Este componente mostra uma "etiqueta".

.. image:: ../resources/label.png

Requisitos
----------
         
=================================== =============== 
``/framework/components/label.js``
``/framework/components/shared.js`` :ref:`jsshared`     
=================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-label>
        <span slot="information">texto</span>
    </fwk-label>

==================== ================================= =========== ============================== =======
Atributo             Descrição                         Obrigatório Opções                         Default
==================== ================================= =========== ============================== =======
``id``               Identificador único do componente Sim (?)        
``value``            Texto do Label                    Sim                          
``hide``             Esconde componente                Não         "true", "false"                "false" 
``color``            Cor base do componente            Não         "blue", "green", "red", "gray" "gray" 
``tooltip-position`` Posição do tooltip                Não         "left", "right"                "right"  
==================== ================================= =========== ============================== =======

.. important:: O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_label = FormHelper.getComponent('fwk_label');

Valor (texto do label)
^^^^^^^^^^^^^^^^^^^^^^
    obj_label.value = '???';

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_label.hide = false;
    obj_label.hide = true;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_label.hide;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.