.. index:: Sphinx (help)

Sphinx Help
===========

Secções
-------

+---------------------+----------------------+----------------------+
| .. code-block:: rst | .. code-block:: rst  | .. code-block:: rst  |
|                     |                      |                      |                                                     
|  ####               |  *******             |                      |
|  Part               |  Chapter             |   Section            | 
|  ####               |  *******             |   =======            |
+---------------------+----------------------+----------------------+
|.. code-block:: rst  | .. code-block:: rst  | .. code-block:: rst  |
|                     |                      |                      |  
|  Subsection         |   Subsubsection      |   Paragraph          |  
|  ----------         |   ^^^^^^^^^^^^^      |   """""""""          | 
+---------------------+----------------------+----------------------+

----

MarkUp texto
------------

==================== ============
``*itálico*``        *itálico*
``**bold**``         **bold**
````código````       ``código``
``aspas \```	     aspas \`
``asterisco \*``	 asterisco \*
``**mark**\ up``	 **mark**\ up
==================== ============

----

Tabela simples
--------------

+---------------------------------------+-------------------------------------+
|  .. code-block:: rst                  |                                     |
|                                       |                                     |
|   ======== ======== ======== ======== | ======== ======== ======== ======== |
|   Coluna 1 Coluna 2 Coluna 3 Coluna 4 | Coluna 1 Coluna 2 Coluna 3 Coluna 4 |
|   ======== ======== ======== ======== | ======== ======== ======== ======== |
|   L 1 C 1  L 1 C 2  L 1 C 3  L 1 C 4  | L 1 C 1  L 1 C 2  L 1 C 3  L 1 C 4  |
|   L 2 C 1  L 2 C 2  L 2 C 3  L 2 C 4  | L 2 C 1  L 2 C 2  L 2 C 3  L 2 C 4  |
|   L 3 C 1  L 3 C 2  L 3 C 3  L 3 C 4  | L 3 C 1  L 3 C 2  L 3 C 3  L 3 C 4  |
|   ======== ======== ======== ======== | ======== ======== ======== ======== |
+---------------------------------------+-------------------------------------+

----

Tabela grid
-----------

+-------------------------------------------------+-----------------------------------------------+
|  .. code-block:: rst                            |                                               |
|                                                 |                                               |
|   +----------+----------+----------+----------+ | +----------+----------+----------+----------+ |
|   | Coluna 1 | Coluna 2 | Coluna 3 | Coluna 4 | | | Coluna 1 | Coluna 2 | Coluna 3 | Coluna 4 | |
|   +==========+==========+==========+==========+ | +==========+==========+==========+==========+ |
|   | L 1 C 1  | L 1 C 2  | L 1 C 3  | L 1 C 4  | | | L 1 C 1  | L 1 C 2  | L 1 C 3  | L 1 C 4  | |
|   +----------+----------+----------+          + | +----------+----------+----------+          + |
|   | L 2 C 1  | L 2 C 2  | L 2 C 3  | L 2 C 4  | | | L 2 C 1  | L 2 C 2  | L 2 C 3  | L 2 C 4  | |
|   +----------+----------+          +----------+ | +----------+----------+          +----------+ |
|   | L 3 C 1  | L 3 C 2  | L 3 C 3  | L 3 C 4  | | | L 3 C 1  | L 3 C 2  | L 3 C 3  | L 3 C 4  | |
|   +----------+----------+----------+----------+ | +----------+----------+----------+----------+ |                                            
+-------------------------------------------------+-----------------------------------------------+

----

Referência link
---------------

.. code-block:: rst 

    Antes de qualquer secção

    .. _askbox:

    Askbox
    ======

Definir link
------------

.. code-block:: rst 

    .. _`link definido`: http://google.com

----

Link interno
------------

+---------------------+---------------+-----------------------+----------------------+
| .. code-block:: rst |               | .. code-block:: rst   |                      |
|                     |               |                       |                      |
|  :ref:`askbox`      | :ref:`askbox` |  :ref:`link <askbox>` | :ref:`link <askbox>` |
+---------------------+---------------+-----------------------+----------------------+

Link externo
------------

.. _`link definido`: http://google.com

+--------------------------------+-------------------------------+------------------------------------+------------------+
| .. code-block:: rst            |                               | .. code-block:: rst                |                  | 
|                                |                               |                                    |                  |
|                                |                               |  (usar link préviamente definido)  |                  |
|  `link <https://google.com>`__ | `link <https://google.com>`__ |  `link definido`_  (usar link)     | `link definido`_ |                    
+--------------------------------+-------------------------------+------------------------------------+------------------+

----

Lista (bullets)
---------------

+---------------------+-------------------+------------------------+-------------+
| .. code-block:: rst |                   | .. code-block:: rst    |             |
|                     |                   |                        |             |
|  * Aaaaaaa          | * Aaaaaa          |  3. Aaaaaaa3           | 3. Aaaaaaa3 |
|     * Aaaaaaa1      |    * Aaaaaaa1     |  #. Aaaaaaa4           | #. Aaaaaaa4 |
|        * Aaaaaaa11  |       * Aaaaaaa11 |  #. Aaaaaaa5           | #. Aaaaaaa5 |
|        * Aaaaaaa12  |       * Aaaaaaa12 |  #. Aaaaaaa6           | #. Aaaaaaa6 |
+---------------------+-------------------+------------------------+-------------+

----

Alertas
-------

====================== ================== ======================== ====================
``.. note:: texto``    .. note:: texto    ``.. seealso:: texto``   .. seealso:: texto  
``.. warning:: texto`` .. warning:: texto ``.. attention:: texto`` .. attention:: texto
``.. tip:: texto``     .. tip:: texto     ``.. important:: texto`` .. important:: texto
``.. danger:: texto``  .. danger:: texto  ``.. todo:: texto``      .. todo:: texto  
====================== ================== ======================== ====================   

----

Imagem
------

+------------------------------------+-----------------------------------+
| .. code-block:: rst                |                                   |
|                                    |                                   |
|  .. image:: resources/base_128.png | .. image:: resources/base_128.png |
|       (opções)                     |                                   |
|       :width: 200px                |                                   |
|       :height: 100px               |                                   |
|       :scale: 50 %                 |                                   |
|       :alt: alternate text         |                                   |
|       :align: right                |                                   |
+------------------------------------+-----------------------------------+

----

Linhas juntas
-------------

+---------------------+-----------+
| .. code-block:: rst |           |
|                     |           |
|  | Linha 1          | | Linha 1 |
|  | Linha 2          | | Linha 2 |
+---------------------+-----------+

----

Linha horizontal
----------------

.. code-block:: rst     

    ----

----

Indexação
---------

.. code-block:: rst

    .. index:: word, word, ...

----

Referências
-----------

| `<https://www.sphinx-doc.org/en/master/>`__
| `<https://rest-sphinx-memo.readthedocs.io/en/latest/ReST.html>`__
| `<https://docs.readthedocs.io/en/stable/intro/getting-started-with-sphinx.html#using-markdown-with-sphinx>`__
| `<https://docs.typo3.org/m/typo3/docs-how-to-document/master/en-us/WritingReST/CheatSheet.html>`__