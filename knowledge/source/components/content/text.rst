.. index:: Text

.. _text:

Text
====

Este componente mostra um texto.

.. image:: ../resources/text.png

Requisitos
----------
         
=================================== =============== 
``/framework/components/text.js``
``/framework/components/shared.js`` :ref:`jsshared`     
=================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-text>
        <span slot="content">Valor inicial do texto (admite html)</span> 
    </fwk-label>

========= ================================= =========== ============================== ========
Atributo  Descrição                         Obrigatório Opções                         Default
========= ================================= =========== ============================== ========
``id``    Identificador único do componente Sim (?)                               
``hide``  Esconde componente                Não         "true", "false"                "false" 
``color`` Cor base do componente            Não         "blue", "green", "red", "gray" "gray" 
``align`` Posição do texto                  Não         "top", "botttom", "center"     "center"  
========= ================================= =========== ============================== ========

.. important:: O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

----

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_text = FormHelper.getComponent('fwk_text');

Valor (texto)
^^^^^^^^^^^^^
    obj_text.value = '???';

Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_text.hide = false;
    obj_text.hide = true;

Ler estados
^^^^^^^^^^^
.. code:: Javascript

    let is_hide = obj_text.hide;

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.